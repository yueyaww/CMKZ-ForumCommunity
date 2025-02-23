<style scoped>
  .login-container {
    position: absolute;
    top: 30%;
    left: 25%;
    display: flex;
  }

  .lottie-div .lottie-player {
    height: 400px;
    width: 400px;
  }

  .login-content {
    border-radius: 10px;
    background-color: aliceblue;
    padding: 20px 30px 10px 30px;
    margin-left: 50px;
  }

  .login-title {
    font-size: 20px;
    font-weight: 700;
  }

  .login-title .app-logo-icon {
    background: url(../../images/logo.png);
    margin-right: 10px;
    background-size: contain;
    height: 60px;
    width: 60px;
    display: inline-block;
    transition: .3s;
    vertical-align: middle;
  }

  .login-input {
    margin-top: 20px;

    display: flex;
    flex-direction: column;
  }

  .login-input input {
    font-size: 16px;
    height: 40px;
  }

  .login-input .h-input {
    display: block;
    margin: 10px 0;
  }

  .buttonDiv {
    margin-top: 10px;
  }

  .buttonDiv .h-btn {
    padding: 12px 0;
    font-size: 18px;
    opacity: .8;
    border-radius: 3px;
    background: @gradient-color;
    border-color: @gradient-color;
  }

  .buttonDiv .h-btn &:hover {
    opacity: 1;
    background: @gradient-color;
    border-color: @gradient-color;
  }

  .copyright {
    margin-top: 20px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .zhuce {
    margin: 10px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

<template>
  <div style="font-size: 0;">
    <canvas ref="canvas" :height="innerHeight" class="login-vue"></canvas>
    <div class="login-container">
      <div class="lottie-div">
        <lottie-player class="lottie-player" autoplay loop background="transparent" mode="normal">
        </lottie-player>
      </div>
      <div class="login-content">
        <div class="login-title">
            <span class="app-logo-icon"></span>
            论坛社区
        </div>
        <div v-show="登录页">
          <div class="login-input">
            <div class="h-input h-input-prefix-icon">
              <input type="text" v-model="登录模型.账号" placeholder="手机号/用户名/邮箱" />
              <i class="h-icon-user"></i>
            </div>
            <div class="h-input h-input-prefix-icon">
              <input type="password" v-model="登录模型.密码" @keyup.enter="denglu_anniu" placeholder="密码"/>
              <i class="h-icon-lock"></i>
            </div>
            <div class="h-input-group">
              <img :src="captchaImage" alt="验证码" style="width: 183px;height: 40px;"/>
              <Button icon="h-icon-refresh" @click="refreshCaptcha"></Button>
            </div>
            <div class="h-input h-input-prefix-icon">
              <input type="text" v-model="登录模型.验证码" placeholder="验证码" />
              <i class="h-icon-edit"></i>
            </div>
          </div>
          <p @click="登录页 = false" class="zhuce">没有账号，<a>注册</a></p>
          <div class="buttonDiv">
            <Button block color="primary" size="l" @click="denglu_anniu">
              登录
            </Button>
          </div>
        </div>
        <div v-show="!登录页">
          <div class="login-input">
            <div class="h-input h-input-prefix-icon">
              <input type="text" v-model="注册模型.手机号" placeholder="输入手机号"/>
              <i class="h-icon-user"></i>                 
            </div>
            <div class="h-input-group" v-width="228">
              <input type="text" v-model="注册模型.验证码" placeholder="输入验证码"/>
              <Button @click="sendSms()">
                <template v-if="!isCounting">获取</template>
                <template v-if="isCounting">{{countdown}}</template>
              </Button>
            </div>
            <div class="h-input h-input-prefix-icon">
              <input type="password" v-model="注册模型.密码" placeholder="输入密码" />
              <i class="h-icon-lock"></i>
            </div>
          </div>
          <p @click="登录页 = true" class="zhuce">已有账号，<a>登录</a></p>
          <div class="buttonDiv">
            <Button block color="primary" size="l" @click="zhuce_anniu">
              注册
            </Button>
          </div>
        </div>
        <p class="copyright"> Copyright ©{{year}} 轲目苦津</p>
      </div>
    </div>
  </div>
</template>

<script>
  import Thpace from "@/js/plug-in/thpace.js";
  import delaunator from "@/js/plug-in/delaunator.min.js";
  import lottiePlayer from "@lottiefiles/lottie-player";
  
  export default {
    components: {
      "lottie-player": lottiePlayer
    },
    data() {
      return { 
        innerHeight: window.innerHeight,
        登录模型: {
          账号: '',
          密码: '',
          验证码: ''
        },
        注册模型: {
          手机号: '',
          验证码: '',
          密码: ''
        },
        ctx: G.get('ctx'),
        imgUrl: G.get('imgUrl'),
        year: Manba().year(),
        loginContent: false,
        spaceboi: null,
        登录页: true,
        captchaText: "",
        验证码: '',
        countdown: 1,
        isCounting: false
      };
    },
    created() {
      this.listenResize();
    },
    computed: {
      // 生成验证码图片的 URL
      captchaImage() {
        return this.generateCaptchaImage(this.captchaText);
      }
    },
    mounted() {
      this.spaceboi = new Thpace(this.$refs.canvas, delaunator);
      this.spaceboi.start();
      this.initLottie();
      this.$nextTick(() => {
        this.loginContent = true;
      });
      // 初始化时生成验证码
      this.refreshCaptcha();
      
      this.验证码 = (Math.floor(Math.random() * 9000) + 1000).toString();
    },
    methods: {
      sendSms() {
        const phoneRegex = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
        if (!phoneRegex.test(this.注册模型.手机号)) {
          this.$Message({
            type: "error",
            text: `请输入正确的手机号`
          });
          return;
        }
        
        if (this.isCounting) return;
        this.isCounting = true;
        this.countdown = 60;
        const interval = setInterval(() => {
          if (this.countdown <= 1) {
            clearInterval(interval);
            this.isCounting = false;
            this.countdown = 1;
          } else {
            this.countdown -= 1;
          }
        }, 1000);
        
        R.Alicloud.sendSMS({
          '手机号': this.注册模型.手机号,
          '验证码': this.验证码
        }).then(resp => {
          if (resp.ok) {
            this.$Notice({
              type: 'success',
              title: "成功",
              content: "发送"
            });
          } else {
            this.$Message({
              type: "error",
              text: `发送失败，稍后再试。`
            });
          }
        });
      },
      startCountdown() {
        if (this.isCounting) return;
        
        this.isCounting = true;
        this.countdown = 60;
        
        const interval = setInterval(() => {
          if (this.countdown <= 0) {
            clearInterval(interval);
            this.isCounting = false;
            this.countdown = 0;
          } else {
            this.countdown -= 1;
          }
        }, 1000);
      },
      zhuce_anniu(){
        const phoneRegex = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
        if (!phoneRegex.test(this.注册模型.手机号)) {
          this.$Message({
            type: "error",
            text: `请输入正确的手机号`
          });
          return;
        }
        if(!this.注册模型.手机号 || !this.注册模型.密码){
          this.$Message({
            type: "error",
            text: `请输入用户名密码`
          });
          return;
        }
        if(!this.注册模型.验证码 || this.注册模型.验证码!= this.验证码){
          this.$Message({
            type: "error",
            text: `验证码不正确`
          });
          return;
        }
        R.User.zhuce(this.注册模型).then(resp => {
          if (resp.ok) {
            R.User.get({id: resp.body._id}).then(resp => {
              if (resp.ok) {
                this.denglu(resp.body);
              }
            });
          } else {
            this.$Message({
              type: "error",
              text: `注册失败，稍后再试。`
            });
          }
        });
      },
      denglu_anniu() {
        if((this.登录模型.验证码).toLowerCase() !=  this.captchaText.toLowerCase()){
          this.$Message({
            type: "error",
            text: `验证码不正确`
          });
          return;
        }
        R.User.denglu(this.登录模型).then(resp => {
          if (resp.ok) {
            this.denglu(resp.body);
          } else {
            this.$Message({
              type: "error",
              text: `用户名或密码不正确`
            });
          }
        });
      },
      denglu(user){
        Utils.saveCookie('token-cookie', user._id, null, "/", 60);
        Utils.saveSessionLocal('token-session', user);
        
        let menus = [];
        for (let 角色 of user.角色) {
          menus.push(...角色.menus);
        }
        G.set('SYS_MENUS', menus);
        
        this.$router.push({
          path: "/"
        });
        this.spaceboi.stop();
      },
      // 生成验证码图片
      generateCaptchaImage(text) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
      
        // 设置画布大小
        canvas.width = 120;
        canvas.height = 40;
      
        // 填充背景色
        ctx.fillStyle = "#f0f0f0";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      
        // 绘制验证码文本
        ctx.font = "24px Arial";
        ctx.fillStyle = "#333";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);
      
        // 添加干扰线
        for (let i = 0; i < 5; i++) {
          ctx.strokeStyle = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
          ctx.beginPath();
          ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
          ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
          ctx.stroke();
        }
      
        // 返回图片的 Data URL
        return canvas.toDataURL();
      },
      // 生成随机验证码文本
      generateCaptchaText() {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let captcha = "";
        for (let i = 0; i < 4; i++) {
          captcha += chars[Math.floor(Math.random() * chars.length)];
        }
        return captcha;
      },
      // 刷新验证码
      refreshCaptcha() {
        this.captchaText = this.generateCaptchaText();
        this.登录模型.验证码 = '';
      },
      listenResize() {
        const resizeEvent = window.addEventListener('resize', () => {
          if (this.innerHeight == window.innerHeight) {
            return;
          }
          this.innerHeight = window.innerHeight;
        });
        this.$once('hook:beforeDestroy', () => {
          window.removeEventListener('resize', resizeEvent);
        });
        window.dispatchEvent(new Event('resize'));
      },
      initLottie() {
        let lottieList = [];
        for (let i = 1; i <= 16; i++) {
          lottieList.push(`${G.get('imgUrl')}src/static/lottie/${i}.json`);
        }
        const random = Math.floor(Math.random() * lottieList.length);
        this.$nextTick(() => {
          const lottie = lottieList[random];
          const player = this.$el.querySelector('.lottie-player');
          if (player.load) {
            player.load(lottie);
          }
        });
      },
    }
  };
</script>
