<template>
  <div class="frame-page ">
    <Row :space="30">
      <Cell :xs='24' :sm='24' :md='7' :lg='7' :xl='7'>
        <div class="h-panel">
          <div class="h-panel-bar">
            <span class="h-panel-title">基本信息</span>
          </div>
          <div class="h-panel-body"  v-if="height" style="overflow:auto;" :style="'height:'+height+'px;'">
            <Form :model="user" ref="form" :readonly="true">
              <FormItem label="用户名:">
                <template v-if="xiugai_yhm_flag">
                  <div class="h-input-group">
                    <input type="text" v-model="user.用户名">
                    <Button style="float: right;" @click="xiugai_yhm_qr()">确认</Button>
                  </div>
                </template>
                <template v-if="!xiugai_yhm_flag">
                  {{user.用户名}}
                </template>
                <Button v-if="user.用户名.indexOf('CMKZ_EY')!=-1&&!xiugai_yhm_flag" style="float: right;" @click="xiugai_yhm_flag=true">修改</Button>
              </FormItem>
              <FormItem label="手机号:">
                {{user.手机号}}
              </FormItem>
              <FormItem label="邮箱:">
                {{user.邮箱}}
              </FormItem>
              <FormItem label="余额:">
                {{user.余额}}点<Button style="float: right;" @click="chongzhi()">充值</Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </Cell>
      <Cell :xs='24' :sm='24' :md='17' :lg='17' :xl='17'>
        <div class="h-panel">
          <div class="h-panel-bar">
            <span class="h-panel-title">安全设置</span>
          </div>
          <div class="h-panel-body" style="padding-top: 0%; overflow:auto;" v-if="height" :style="'height:'+height+'px;'">
            <div class="security-setting-vue">
              <div class="common-list-container">
                <div class="common-list-item">
                  <div class="common-list-meta">
                    <p class="font-bold"><i class="icon-head"></i> 帐号密码</p>
                    <p>更新当前帐号密码</p>
                  </div>
                  <div class="common-list-action"><Button @click="xiugai()">修改</Button></div>
                </div>
                <div class="common-list-item">
                  <div class="common-list-meta">
                    <p class="font-bold"><i class="icon-microphone"></i> 绑定手机</p>
                    <p>设置您的绑定手机号码</p>
                  </div>
                  <div class="common-list-action"><Button @click="xiugai">修改</Button></div>
                </div>
                <div class="common-list-item">
                  <div class="common-list-meta">
                    <p class="font-bold"><i class="icon-mail"></i> 绑定邮箱</p>
                    <p>设置您的绑定邮箱</p>
                  </div>
                  <div class="common-list-action"><Button @click="xiugai">修改</Button></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Cell>
    </Row>
    
  </div>
</template>

<script>
  import ModalChongzhi from "./modal/chongzhi.vue";
  export default {
    data() {
      return {
        user: Utils.getSessionLocal2Json("token-session"),
        height: 450,
        xiugai_yhm_flag: false
      };
    },
    created() {
      this.height = (document.body.clientHeight - 272);
    },
    mounted() {
      
    },
    methods: {
      chongzhi() {
        this.$Modal({
          middle: true,
          hasDivider: true,
          closeOnMask: false,
          component: {
            vue: ModalChongzhi,
            datas: {}
          },
          events: {
            success: (modal, data) => {
              this.user.余额 = data.余额;
            }
          }
        });
      },
      xiugai_yhm_qr(){
        R.User.update({
          _id: Utils.getSessionLocal2Json("token-session")._id,
          用户名: this.user.用户名
        }).then(res =>{
        	if (res.ok) {
        	  this.$Notice({
        	    type: 'success',
        	    title: "成功",
        	    content: ""
        	  });
            Utils.saveSessionLocal('token-session', this.user);
            this.xiugai_yhm_flag = false;
        	} else {
        	  this.$Notice({
        	    type: 'error',
        	    title: "失败",
        	    content: res.msg
        	  });
        	}
        });
      },
      xiugai(){
        this.$Notice({
          type: 'warn',
          title: "提示",
          content: "此功能暂不可用，即将更新"
        });
      }
    },
    computed: {
    }
  };
</script>

<style>
</style>
