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
    padding: 50px 40px;
    margin-left: 50px;
    ;
  }

  .login-title {
    font-size: 20px;
    font-weight: 700;
  }

  .login-title .app-logo-icon {
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
    margin-top: 45px;
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
          <!-- <span class="app-logo-icon"
            style="background-image: url('/static/images/src/images/logo.png')"></span> -->
            <span class="app-logo-icon"
            :style="{backgroundImage:'url('+imgUrl+'static/images/src/images/logo.png)'}"></span>
            论坛社区
        </div>
        <div class="login-input">
          <div class="h-input h-input-prefix-icon">
            <input type="text" name="username" v-model="model.username" autocomplete="off" />
            <i class="h-icon-user"></i>
          </div>
          <div class="h-input h-input-prefix-icon">
            <input type="password" name="password" v-model="model.password" @keyup.enter="submit" />
            <i class="h-icon-lock"></i>
          </div>
        </div>
        <div class="buttonDiv">
          <Button block color="primary" size="l" @click="submit">
            登录
          </Button>
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
        model: {
          username: '',
          password: ''
        },
        ctx: G.get('ctx'),
        imgUrl: G.get('imgUrl'),
        year: Manba().year(),
        loginContent: false,
        spaceboi: null
      };
    },
    created() {
      this.listenResize();
    },
    mounted() {
      this.spaceboi = new Thpace(this.$refs.canvas, delaunator);
      this.spaceboi.start();
      this.initLottie();
      this.$nextTick(() => {
        this.loginContent = true;
      });
    },
    methods: {
      submit() {
        R.Login.login(this.model).then(resp => {
          if (resp.ok) {
            let user = resp.body;

            Utils.saveCookie('kb-token-cookie', user._id, null, "/", 60 * this.preference.logoutLimit);
            Utils.saveSessionLocal('kb-token-session', user);

            G.set('SYS_MENUS', user.role.menus);
            G.trigger('SYS_MENU_UPDATE');

            this.$router.push({
              path: "/"
            });
            this.spaceboi.stop();

          } else {
            this.$Message({
              type: "error",
              text: `用户名或密码不正确`
            });
          }
          this.loading = false;
        });
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
        for (let i = 1; i <= 18; i++) {
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
