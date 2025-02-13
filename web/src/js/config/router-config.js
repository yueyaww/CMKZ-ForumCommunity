import Vue from 'vue';
import VueRouter from 'vue-router';
import views from './router-views-config';
import {
  isAuthPage
} from 'js/config/menu-config';

Vue.use(VueRouter);

const initRouter = () => {
  const routerParam = {
    mode: 'hash',
    base: G.get('appName'),
    routes: [{
      path: '/login',
      name: 'Login',
      component: (resolve) => require(['components/login/index'], resolve)
    }, {
      path: '/',
      component: (resolve) => require(['components/app/app-frame'], resolve),
      children: [{
          path: '/',
          name: 'Home',
          component: (resolve) => require(['components/home/index'], resolve),
          meta: {
            title: '首页',
            icon: 'icon-monitor',
            auth: true
          }
        }, {
          path: '/system-error',
          name: 'SystemError',
          component: (resolve) => require(['components/error-pages/500'], resolve),
          meta: {
            title: '系统错误'
          }
        }, {
          path: '/permission-error',
          name: 'PermissionError',
          component: (resolve) => require(['components/error-pages/403'], resolve),
          meta: {
            title: '权限错误'
          }
        },
        {
          path: '/notfound-error',
          name: 'NotfoundError',
          component: (resolve) => require(['components/error-pages/404'], resolve),
          meta: {
            title: '页面找不到'
          }
        }, {
            path: '/users',
            name: 'UserManage',
            component: (resolve) => require(['components/management/user/index'], resolve),
            meta: {
              title: '用户管理'
            }
        },
        ...views,
        {
          path: '*',
          name: 'CommonNotfoundError',
          component: (resolve) => require(['components/error-pages/404'], resolve),
          meta: {
            title: '页面找不到'
          }
        }
      ]
    }]
  };

  let router = new VueRouter(routerParam);
  let isFirstRouter = true;

  router.beforeEach((to, from, next) => {
    let session = Utils.getSessionLocal2Json('token-session');
    if (to.matched.some(record => record.meta.auth) && !session) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
      return;
    } else {
      next();
    }
    if (!isFirstRouter && !isAuthPage(to.name)) {
      next({
        name: 'PermissionError'
      });
      return;
    }
    HeyUI.$LoadingBar.start();
    if (to.meta && to.meta.title) {
      document.title = to.meta.title + ' - 轲目苦津';
    } else {
      document.title = '轲目苦津';
    }
    isFirstRouter = false;
    next();
  });
  router.afterEach(() => {
    HeyUI.$LoadingBar.success();
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    let layoutContent = document.querySelector('.h-layout-content');
    if (layoutContent) {
      layoutContent.scrollTop = 0;
    }
  });
  return router;
};

export default initRouter;
