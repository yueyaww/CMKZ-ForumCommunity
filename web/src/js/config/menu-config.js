const fullMenus = [
  {
    title: '首页',
    key: 'Home',
    icon: 'icon-monitor'
  },
  {
    title: '设置',
    key: 'SysSetting',
    icon: 'icon-cog',
    children: [
      {
        title: '用户',
        key: 'UserManage',
      	icon: 'icon-head'
      },
      {
        title: '用户组',
        key: 'UserGroup',
      	icon: 'icon-head'
      },
      {
        title: '个人中心',
        key: 'Gerenzhongxin',
      	icon: 'icon-head'
      },
      {
        title: '社区配置',
        key: 'ShequPeizhi',
      	icon: 'icon-layout'
      }
    ]
  }
];

const getMenus = function (menuIdList = []) {
  return getAuthMenu(fullMenus, menuIdList);
};

let getAuthMenu = (menus, menuIdList) => {
  let configMenu = [];
  for (let menu of menus) {
    let m = Utils.copy(menu);
    if (menuIdList.indexOf(m.key) > -1) {
      configMenu.push(m);
    }
    if (menu.children && menu.children.length) {
      m.children = getAuthMenu(menu.children, menuIdList);
    }
  }
  return configMenu;
};

const getKeys = function (menus) {
  let keys = [];
  for (let menu of menus) {
    keys.push(menu.key);
    if (menu.children && menu.children.length) {
      keys.push(...getKeys(menu.children));
    }
  }
  return keys;
};

let fullMenuKeys = getKeys(fullMenus);

const isAuthPage = function (name) {
  let menus = G.get('SYS_MENUS') || [];
  if (fullMenuKeys.indexOf(name) > -1 && menus.indexOf(name) == -1) {
    return false;
  }
  return true;
};

export { getMenus, fullMenus, fullMenuKeys, isAuthPage };
