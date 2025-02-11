import Ajax from './ajax';

const Request = {
  用户: {
    注册(param) {
      return Ajax.postJson('/user/zhuce', param);
    },
    登录(param) {
      return Ajax.postJson('/user/denglu', param);
    }
  }
};

export default Request;
