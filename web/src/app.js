import '@babel/polyfill';
import Vue from 'vue';
import App from 'components/App';

import heyuiConfig from 'js/config/heyui-config';
import routerConfig from 'js/config/router-config';
import store from 'js/vuex/store';
import 'js/vue/components';
import 'js/vue/filters';
import config from '../config.json';

import { io } from 'socket.io-client';

require('./css/app.less');

heyuiConfig();
Vue.use(HeyUI);

const router = routerConfig();

G.set("ctx", config[config.startType].ctx);
G.set("appName", config[config.startType].appName);
G.set("imgUrl", config[config.startType].imgUrl);

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
