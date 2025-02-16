<template>
  <div>
    <h1>微信支付</h1>
    <canvas ref="qrCodeCanvas"></canvas>
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

export default {
  data() {
    return {
      loading: true,
      qrCodeUrl: '',
      paymentStatus: '',
      intervalId: null,
    };
  },
  async created() {
    // 调用后端接口生成支付链接
    // await this.generateWechatPayLink();
    this.loading = false;

    // // 开始轮询支付状态
    // this.intervalId = setInterval(this.checkPaymentStatus, 3000);
    
    // R.WeChat.get().then(res =>{
    //   this.qrCodeUrl = res.code_url;
    //   this.generateQRCode();
    //   console.log(res);
    // });
    // this.qrCodeUrl = "weixin://wxpay/bizpayurl?pr=58byl2Fz3";
    // this.generateQRCode();
  },
  mounted() {
    console.log(this.$refs.qrCodeCanvas);
    this.qrCodeUrl = "weixin://wxpay/bizpayurl?pr=58byl2Fz3";
    this.generateQRCode();
  },
  methods: {
    // 调用后端接口生成支付链接
    async generateWechatPayLink() {
      try {
        const response = await axios.post('/api/wechat-pay/create-order', {
          amount: 1, // 金额（单位：分）
          description: '测试商品',
          outTradeNo: 'ORDER123456',
          notifyUrl: 'https://yourdomain.com/notify',
        });
        this.qrCodeUrl = response.data.code_url;
        this.generateQRCode();
      } catch (error) {
        console.error('生成支付链接失败:', error.message);
        this.qrCodeUrl = '';
      }
    },

    // 生成二维码
    generateQRCode() {
      console.log(1111);
      console.log(this.$refs.qrCodeCanvas);
      if (this.qrCodeUrl && this.$refs.qrCodeCanvas) {
        console.log(2222);
        console.log(this.qrCodeUrl);
        QRCode.toCanvas(this.$refs.qrCodeCanvas, this.qrCodeUrl, (error) => {
          if (error) console.error('生成二维码失败:', error);
        });
      }
    },

    // 检查支付状态
    async checkPaymentStatus() {
      try {
        const response = await axios.get('/api/wechat-pay/check-status', {
          params: { outTradeNo: 'ORDER123456' },
        });
        if (response.data.status === 'SUCCESS') {
          this.paymentStatus = '支付成功';
          clearInterval(this.intervalId);
        } else if (response.data.status === 'FAIL') {
          this.paymentStatus = '支付失败';
          clearInterval(this.intervalId);
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
