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
};

export default Request;
