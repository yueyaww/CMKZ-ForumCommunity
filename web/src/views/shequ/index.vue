<template>
  <div>
    <h1>微信支付</h1>
    <div v-if="loading">加载中...</div>
    <div v-else>
      <div v-if="qrCodeUrl">
        <canvas ref="qrCodeCanvas"></canvas>
        <p>请使用微信扫描二维码完成支付</p>
      </div>
      <div v-else>
        无法生成支付二维码，请重试。
      </div>
      <div v-if="paymentStatus">
        支付状态: {{ paymentStatus }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import QRCode from 'qrcode';
import { parseStringPromise } from 'xml2js';

export default {
  data() {
    return {
      loading: true, // 加载状态
      qrCodeUrl: '', // 微信支付二维码链接
      paymentStatus: '', // 支付状态
      intervalId: null, // 轮询定时器ID
      orderId: 'ORDER123456', // 订单号（示例）
      totalFee: 1, // 金额（单位：分，示例）
      body: '测试商品', // 商品描述（示例）
    };
  },
  async created() {
    // 组件创建时生成支付链接
    await this.generateWechatPayLink();
    // this.loading = false;

    // // 开始轮询支付状态
    // this.intervalId = setInterval(this.checkPaymentStatus, 3000);
  },
  methods: {
    // 生成随机字符串
    generateNonceStr() {
      return Math.random().toString(36).substr(2, 15);
    },

    // 生成签名
    generateSign(params, key) {
      const stringA = Object.keys(params)
        .sort()
        .map((k) => `${k}=${params[k]}`)
        .join('&');
      const stringSignTemp = `${stringA}&key=${key}`;
      return require('crypto').createHash('md5').update(stringSignTemp).digest('hex').toUpperCase();
    },

    // 生成微信支付链接
    async generateWechatPayLink() {
      const params = {
        appid: 'wxe724093c14513196', 
        mch_id: '1700361677', 
        nonce_str: this.generateNonceStr(),
        body: this.body,
        out_trade_no: this.orderId,
        total_fee: this.totalFee,
        spbill_create_ip: '127.0.0.1',
        notify_url: 'http://yuntuanai.top/notify',
        trade_type: 'NATIVE',
      };

      // 生成签名
      params.sign = this.generateSign(params, '45854273260358674283855867428385'); //商户密钥

      // 将参数转换为XML格式
      const builder = new (require('xml2js').Builder)({ rootName: 'xml', headless: true });
      const xml = builder.buildObject(params);

      try {
        // 调用微信支付统一下单API
        const response = await axios.post('https://api.mch.weixin.qq.com/pay/unifiedorder', xml, {
          headers: { 'Content-Type': 'text/xml' },
        });

        // 解析XML响应
        const result = await parseStringPromise(response.data, { explicitArray: false });

        if (result.xml.return_code === 'SUCCESS' && result.xml.result_code === 'SUCCESS') {
          this.qrCodeUrl = result.xml.code_url; // 获取支付二维码链接
          this.generateQRCode(); // 生成二维码
        } else {
          throw new Error(result.xml.return_msg || '生成支付链接失败');
        }
      } catch (error) {
        console.error('生成微信支付链接失败:', error.message);
        this.qrCodeUrl = '';
      }
    },

    // 生成二维码
    generateQRCode() {
      if (this.qrCodeUrl && this.$refs.qrCodeCanvas) {
        QRCode.toCanvas(this.$refs.qrCodeCanvas, this.qrCodeUrl, (error) => {
          if (error) console.error('生成二维码失败:', error);
        });
      }
    },

    // 检查支付状态
    async checkPaymentStatus() {
      try {
        const response = await axios.get('/api/wechat-pay/status', {
          params: { orderId: this.orderId },
        });
        if (response.data.status === 'SUCCESS') {
          this.paymentStatus = '支付成功';
          clearInterval(this.intervalId); // 停止轮询
        } else if (response.data.status === 'FAIL') {
          this.paymentStatus = '支付失败';
          clearInterval(this.intervalId); // 停止轮询
        }
      } catch (error) {
        console.error('检查支付状态失败:', error.message);
      }
    },
  },
  beforeDestroy() {
    // 组件销毁时清除定时器
    clearInterval(this.intervalId);
  },
};
</script>

<style scoped>
canvas {
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  margin: 20px 0;
}
</style>
