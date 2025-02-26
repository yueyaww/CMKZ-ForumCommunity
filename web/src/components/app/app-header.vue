<style lang="less">
.app-header {
  color: rgba(49, 58, 70, 0.8);

  .h-autocomplete {
    line-height: 1.5;
    float: left;
    margin-top: 15px;
    margin-right: 20px;
    width: 120px;
    &-show,&-show:hover, &-show.focusing {
      outline: none;
      box-shadow: none;
      border-color: transparent;
      border-radius: 0;
    }
    &-show.focusing{
      border-bottom: 1px solid #eee;
    }
  }
  &-info &-icon-item {
    cursor: pointer;
    display: inline-block;
    float: left;
    padding: 0 15px;
    height: @layout-header-height;
    line-height: @layout-header-height;
    margin-right: 10px;
    &:hover {
      background: @hover-background-color;
    }
    i {
      font-size: 18px;
    }
    a {
      color: inherit;
    }
    .h-badge {
      margin: 20px 0;
      display: block;
    }
  }
  .h-dropdownmenu {
    float: left;
  }

  &-dropdown{
    float: right;
    margin-left: 10px;
    padding: 0 20px 0 15px;
    .h-icon-down {
      right: 20px;
    }
    cursor: pointer;
    &:hover, &.h-pop-trigger {
      background: @hover-background-color;
    }
    &-dropdown {
      padding: 5px 0;
      .h-dropdownmenu-item {
        padding: 8px 20px;
      }
    }
  }

  &-menus{
    display: inline-block;
    vertical-align: top;
    >div {
      display: inline-block;
      font-size: 15px;
      padding: 0 25px;
      color: @dark-color;
      &:hover{
        color: @primary-color;
      }
      +div {
        margin-left: 5px;
      }
      &.h-tab-selected{
        color: @white-color;
        background-color: @primary-color;
      }
    }
  }
}
</style>

<template>
  <div class="app-header">
    <div style="width:50px;float:left;"><Button :icon="siderCollapsed ? 'icon-align-right':'icon-align-left'" size="l" noBorder class="font20" @click="siderCollapsed=!siderCollapsed"></Button></div>
    <div class="float-right app-header-info">
      <!-- <div class="app-header-icon-item" v-tooltip content="系统布局配置" theme="white" @click="showSettingModal">
        <i class="icon-content-left"></i>
      </div> -->
      <!-- <appHeaderMessage></appHeaderMessage> -->
      <DropdownMenu className="app-header-dropdown" trigger="hover" offset="0,5" :width="150" placement="bottom-end" :datas="infoMenu" @onclick="trigger">
        <Avatar :width="30"><span>{{user.用户名}}</span></Avatar>
      </DropdownMenu>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import appHeaderMessage from './modules/app-header-message';
import socket from '@/js/common/socket';

export default {
  components: {
    // appHeaderMessage
  },
  data() {
    return {
      searchText: '',
      infoMenu: [
        { key: 'info', title: '个人信息', icon: 'h-icon-user' },
        { key: 'logout', title: '退出登录', icon: 'h-icon-outbox' }
      ],
      user: Utils.getSessionLocal2Json("token-session")
    };
  },
  computed: {
    siderCollapsed: {
      get() {
        return this.$store.state.siderCollapsed;
      },
      set(value) {
        this.$store.commit('updateSiderCollapse', value);
      }
    },
  },
  mounted() {
    this.listenResize();
    socket.on('receiveMessage', (data) => {
      // 首先，让我们检查我们是否有权限发出通知
      if (window.Notification && Notification.permission !== "denied") {
        // 如果没有，我们就请求获得权限(仅限第一次)
        Notification.requestPermission(function (status) {
          if (Notification.permission !== status) {
            Notification.permission = status;
          }
        // 如果用户同意了
        if (status === "granted") {
          //设置发送消息
          let options={
            body:'有新消息',
          }
          //创建提示
          new Notification("Hi!",options);
        }	
        });
      }else{
        this.$Message({
          type: "error",
          text: `未获得权限。`
        });
      }
    });
  },
  methods: {
    listenResize() {
      let windowWidth = window.innerWidth;
      const resizeEvent = window.addEventListener('resize', () => {
        if (windowWidth == window.innerWidth) {
          return;
        }
        if (this.siderCollapsed && window.innerWidth > 900) {
          this.siderCollapsed = false;
        } else if (!this.siderCollapsed && window.innerWidth < 900) {
          this.siderCollapsed = true;
        }
        windowWidth = window.innerWidth;
      });
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('resize', resizeEvent);
      });
      window.dispatchEvent(new Event('resize'));
    },
    trigger(data) {
      if (data == 'logout') {
        Utils.saveLocal('SYS_TABS', []);
        Utils.removeCookie('token-cookie')
        Utils.removeSessionLocal('token-session');
        this.$router.replace({ name: 'Login' });
      } else {
        this.$router.push({ name: 'Gerenzhongxin' });
      }
    },
    showSettingModal() {
      this.$emit('openSetting');
    }
  }
};
</script>
