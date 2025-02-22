import Ajax from './ajax';

const Request = {
  User: {
    zhuce(param) {
      return Ajax.postJson('/user/zhuce', param);
    },
    denglu(param) {
      return Ajax.postJson('/user/denglu', param);
    },
    gets(param) {
      return Ajax.get('/users', param);
    },
    get(param) {
      return Ajax.get('/user', param);
    },
    update(param) {
      return Ajax.postJson('/user/update', param);
    }
  },
  Role:{
    gets() {
      return Ajax.get('/roles');
    },
    save(param) {
      return Ajax.postJson('/role', param);
    },
    delete(param){
      return Ajax.delete('/role',param);
    }
  },
  Shequ:{
    gets() {
      return Ajax.get('/shequs');
    },
    save(param) {
      return Ajax.postJson('/shequ', param);
    }
  },
  Huati:{
    save(param) {
      return Ajax.postJson('/huati', param);
    },
    page(param) {
      return Ajax.postJson('/huati/page',param);
    }
  },
  HuatiHuifu:{
    save(param) {
      return Ajax.postJson('/huatihuifu', param);
    },
    gets(param) {
      return Ajax.get('/huatihuifus', param);
    }
  },
  WeChat:{
    get(param) {
      return Ajax.get('/wechat/url', param);
    },
    queryOrder(param) {
      return Ajax.get('/wechat/queryOrder', param);
    }
  },
  Alicloud:{
    sendSMS(param) {
      return Ajax.get('/alicloud/sendSMS', param);
    }
  },
  UserGroup:{
    get(param) {
      return Ajax.get('/userGroup', param);
    },
    gets() {
      return Ajax.get('/userGroups');
    },
    save(param) {
      return Ajax.postJson('/userGroup', param);
    }
  },
  HuatiType:{
    get(param) {
      return Ajax.get('/huatiType', param);
    },
    gets(param) {
      return Ajax.get('/huatiTypes', param);
    },
    save(param) {
      return Ajax.postJson('/huatiType', param);
    },
    delete(param) {
      return Ajax.delete('/huatiType', param);
    }
  }
};

export default Request;
