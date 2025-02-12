export default [{
  path: '/gerenzhongxin',
  name: 'Gerenzhongxin',
  component: (resolve) => require(['views/gerenzhongxin/index'], resolve),
  meta: { title: '个人中心', icon: 'icon-head', auth: true }
}];
