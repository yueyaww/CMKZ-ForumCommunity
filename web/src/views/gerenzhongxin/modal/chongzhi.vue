<template>
  <div>
    <!-- h-modal-header 将自带modal头部样式 -->
    <header class="h-modal-header">充值</header>
    <div style="padding:15px">
      <template v-if="!qrCodeUrl">
        <div><Radio value='1点' v-model="dianshuType" @change="change_dianshuType">1点</Radio></div>
        <div><Radio value='10点' v-model="dianshuType" @change="change_dianshuType">10点</Radio></div>
        <div>
          <Radio value='自定义' v-model="dianshuType" @change="change_dianshuType">自定义</Radio>
          <input type="number" @change="change_zidingyi" v-model="dianshu" v-if="dianshuType == '自定义'"/>
        </div>
        
        <div class="h-input-group" style="padding-top: 10px;" v-width="200">
          <input type="text" v-model="jine" readonly/>
          <span class="h-input-addon">元</span>
        </div>
        
      </template>
      <div v-show="qrCodeUrl" style="text-align: center;">
        <h2>微信扫码支付</h2>
        <canvas ref="qrCodeCanvas" ></canvas>
        <h2>{{jine / 100}}元</h2>
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
        jine: 2000,
        qrCodeUrl: null,
        out_trade_no: ''
      };
    },
    mounted() {
      this.qrCodeUrl = null;
    },
    methods: {
      change_zidingyi(){
        this.jine = this.dianshu * 2000;
      },
      change_dianshuType(){
        switch (this.dianshuType){
          case '1点':
            this.jine = 2000;
            this.dianshu = 1;
            break;
          case '10点':
            this.jine = 2000* 10;
            this.dianshu = 10;
            break;
          case '自定义':
            this.jine = 2000* this.dianshu;
            break;
          default:
            break;
        }
      },
      success() {
        this.jine = this.jine*100;
        
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
            R.User.update({
              _id: Utils.getSessionLocal2Json("token-session")._id,
              余额: this.dianshu
            }).then(res =>{
            	if (res.ok) {
            	  this.$Notice({
            	    type: 'success',
            	    title: "成功",
            	    content: "充值"
            	  });
                Utils.getSessionLocal2Json("token-session").余额 = this.dianshu;
                Utils.saveSessionLocal('token-session', Utils.getSessionLocal2Json("token-session"));
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
