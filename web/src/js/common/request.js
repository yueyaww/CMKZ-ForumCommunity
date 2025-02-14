import Ajax from './ajax';

const Request = {
  User: {
    zhuce(param) {
      return Ajax.postJson('/user/zhuce', param);
    },
    denglu(param) {
      return Ajax.postJson('/user/denglu', param);
    },
    gets() {
      return Ajax.get('/users');
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
    },
  },
};

export default Request;
