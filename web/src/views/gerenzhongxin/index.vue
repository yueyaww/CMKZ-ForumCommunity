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
                {{user.用户名}}
              </FormItem>
              <FormItem label="手机号:">
                {{user.手机号}}
              </FormItem>
              <FormItem label="邮箱:">
                {{user.邮箱}}
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
                  <div class="common-list-action"><Button>修改</Button></div>
                </div>
                <div class="common-list-item">
                  <div class="common-list-meta">
                    <p class="font-bold"><i class="icon-microphone"></i> 绑定手机</p>
                    <p>设置您的绑定手机号码</p>
                  </div>
                  <div class="common-list-action"><Button>修改</Button></div>
                </div>
                <div class="common-list-item">
                  <div class="common-list-meta">
                    <p class="font-bold"><i class="icon-mail"></i> 绑定邮箱</p>
                    <p>设置您的绑定邮箱</p>
                  </div>
                  <div class="common-list-action"><Button>修改</Button></div>
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
  export default {
    data() {
      return {
        user: Utils.getSessionLocal2Json("token-session"),
        height: 450
      };
    },
    created() {
      this.height = (document.body.clientHeight - 272);
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
  
      }
    },
    computed: {
    }
  };
</script>

<style>
</style>
