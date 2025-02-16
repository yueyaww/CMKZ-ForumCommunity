<template>
  <div>
    <!-- h-modal-header 将自带modal头部样式 -->
    <header class="h-modal-header">充值</header>
    <div style="padding:15px">
      <template v-if="!qrCodeUrl">
        <Radio v-model="dianshuType" :datas="['1点', '10点', '自定义']"></Radio>
        <input type="number" v-model="dianshu" v-if="dianshuType == '自定义'"/>
      </template>
      <div v-show="qrCodeUrl" style="text-align: center;">
        <h2>微信扫码支付</h2>
        <canvas ref="qrCodeCanvas" ></canvas>
      </div>
    </div>
    <!-- h-modal-footer 将自带modal底部样式 -->
    <footer class="h-modal-footer">
      <button class="h-btn" @click="close">关闭</button>
      <button v-if="!qrCodeUrl" class="h-btn h-btn-primary" @click="success">确定</button>
    </footer>
  </div>
</template>

<script>
  import axios from 'axios';
  import QRCode from 'qrcode';
  export default {
    props: {
    },
    data() {
      return {
        dianshuType: '1点',
        dianshu: '',
        jine: 0,
        qrCodeUrl: null,
        out_trade_no: ''
      };
    },
    mounted() {
      this.qrCodeUrl = null;
    },
    methods: {
      success() {
        switch (this.dianshuType){
          case '1点':
            this.jine = 2000* 100;
            this.dianshu = 1;
            break;
          case '10点':
            this.jine = 2000* 100* 10;
            this.dianshu = 10;
            break;
          case '自定义':
            this.jine = 2000* 100* this.dianshu;
            break;
          default:
            break;
        }
        
        this.qrCodeUrl = "weixin://wxpay/bizpayurl?pr=58byl2Fz3";
        this.generateQRCode();
        R.WeChat.get({'total': this.jine}).then(res =>{
        // R.WeChat.get({'total': 1}).then(res =>{
          this.qrCodeUrl = res.code_url;
          this.out_trade_no = res.out_trade_no;
          this.generateQRCode();
          // 开始轮询支付状态
          this.intervalId = setInterval(this.checkPaymentStatus, 3000);
          console.log(this.out_trade_no);
        });
      },
      // 生成二维码
      generateQRCode() {
        if (this.qrCodeUrl && this.$refs.qrCodeCanvas) {
          QRCode.toCanvas(this.$refs.qrCodeCanvas, this.qrCodeUrl, (error) => {
            if (error) console.error('生成二维码失败:', error);
          });
        }
      },
      checkPaymentStatus() {
        R.WeChat.queryOrder({'outTradeNo': this.out_trade_no}).then(res =>{
          console.log(res.data);
          if(res.data.trade_state_desc == '支付成功'){
            clearInterval(this.intervalId);
            let user = {
              _id: Utils.getSessionLocal2Json("token-session")._id,
              余额: this.dianshu
            };
            R.User.update(user).then(res =>{
            	if (res.ok) {
            	  this.$Notice({
            	    type: 'success',
            	    title: "成功",
            	    content: "充值"
            	  });
            	  this.$emit('success', user);
            	  this.close();
            	} else {
            	  this.$Notice({
            	    type: 'error',
            	    title: "失败",
            	    content: res.msg
            	  });
            	}
            });
          }
        });
      },
      close() {
        this.$emit('close');
        clearInterval(this.intervalId);
      },
      beforeDestroy() {
        clearInterval(this.intervalId);
      }
    }
  };
</script>

<style>
</style>
