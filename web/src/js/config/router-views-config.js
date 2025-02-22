export default [{
  path: '/gerenzhongxin',
  name: 'Gerenzhongxin',
  component: (resolve) => require(['views/gerenzhongxin/index'], resolve),
  meta: { title: '个人中心', icon: 'icon-head', auth: true }
},{
  path: '/shequ',
  name: 'Shequ',
  component: (resolve) => require(['views/shequ/index'], resolve),
  meta: { title: '社区', icon: 'icon-layout', auth: true }
},{
  path: '/userGroup',
  name: 'UserGroup',
  component: (resolve) => require(['views/usergroup/index'], resolve),
  meta: { title: '用户组', icon: 'icon-head', auth: true }
},{
  path: '/shequPeizhi',
  name: 'ShequPeizhi',
  component: (resolve) => require(['views/shequ-peizhi/index'], resolve),
  meta: { title: '社区配置', icon: 'icon-head', auth: true }
}];
