<style lang='less'>
</style>
<template>
  <div>
    <Layout class="app-frame" :siderCollapsed="siderCollapsed" :siderFixed="layoutConfig.siderFixed">
      <Sider :theme="layoutConfig.siderTheme">
        <appMenu :theme="layoutConfig.siderTheme"></appMenu>
      </Sider>
      <Layout :headerFixed="layoutConfig.headerFixed">
        <HHeader theme="white">
          <appHead @openSetting="openSetting=true" :layoutConfig="layoutConfig"></appHead>
        </HHeader>
        <SysTabs v-if="layoutConfig.showSystab" homePage="Home"></SysTabs>
        <Content>
          <div class="app-frame-content">
           <router-view></router-view>
          </div>
          <HFooter>
            <appFooter></appFooter>
          </HFooter>
        </Content>
      </Layout>
    </Layout>
    <Modal v-model="openSetting" type="drawer-right">
      <appLayoutSetting :layoutConfig="layoutConfig"></appLayoutSetting>
    </Modal>
  </div>
</template>
<script>
import appLayoutSetting from './modules/app-layout-setting';
import appHead from './app-header';
import appMenu from './app-menu';
import appFooter from './app-footer';
import SysTabs from '../common/sys-tabs';
import store from 'js/vuex/store';
import { mapState } from 'vuex';
import { fullMenuKeys, isAuthPage } from 'js/config/menu-config';

export default {
  data() {
    return {
      loading: true,
      openSetting: false,
      layoutConfig: {
        siderTheme: 'white',
        showSystab: false,
        headerFixed: true,
        siderFixed: true,
      },
      user: {}
    };
  },
  mounted() {
    this.init();
    const listener = G.addlistener('SYS_MENU_REFRESH', () => {
      let user = Utils.getSessionLocal2Json("token-session");
      this.initMenu(user);
    });
    this.$once('hook:beforeDestroy', function () {
      G.removelistener(listener);
    });
  },
  methods: {
    init() {
      this.$Loading('加载中');
      let token = Utils.getCookie('token-cookie');
      let user = Utils.getSessionLocal2Json("token-session");
      
      this.initMenu(user);
      
      user.avatar = require('../../images/avatar.png');
      store.dispatch('updateAccount', user);
      this.$Loading.close();
      return user;
    },
    initMenu(user) {
      G.set('SYS_MENUS', user.角色.menus);
      G.trigger('SYS_MENU_UPDATE');
    },
    updateLayoutConfig({ key, value }) {
      this.layoutConfig[key] = value;
    }
  },
  computed: {
    ...mapState(['siderCollapsed'])
  },
  components: {
    appHead,
    appMenu,
    SysTabs,
    appFooter,
    appLayoutSetting
  }
};
</script>
