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
}];
