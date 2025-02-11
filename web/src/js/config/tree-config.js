export default function () {
  return {
    simple: {
      keyName: 'id',
      parentName: 'parent',
      titleName: 'title',
      dataMode: 'list',
      datas() {
        return list;
      }
    }
  };
};
