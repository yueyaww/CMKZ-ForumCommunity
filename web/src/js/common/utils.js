import utils from 'hey-utils';

const rclass = /[\t\r\n\f]/g;

export default utils.extend({}, utils, {
  getClass(elem) {
    return (elem.getAttribute && elem.getAttribute('class')) || '';
  },
  hasClass(elem, selector) {
    let className;
    className = ` ${selector} `;
    if (elem.nodeType === 1 && (` ${this.getClass(elem)} `)
      .replace(rclass, ' ')
      .indexOf(className) > -1) {
      return true;
    }
    return false;
  },
  prefixZero(num, n) {
    return (Array(n).join(0) + num).slice(-n);
  },
  saveSessionLocal(name, value) {
    if (window.sessionStorage && JSON && name) {
      if (typeof value == 'object') {
        value = JSON.stringify(value);
      }
      window.sessionStorage.setItem(name, value);
      return true;
    }
    return false;
  },
  getSessionLocal(name, type) {
    if (window.sessionStorage && JSON && name) {
      const data = window.sessionStorage.getItem(name);
      if (type && type == 'json' && !this.isNull(data)) {
        try {
          return JSON.parse(data);
        } catch (e) {
          console.error(`取数转换json错误${e}`);
          return '';
        }
      } else {
        return data;
      }
    }
    return null;
  },
  getSessionLocal2Json(name) {
    return this.getSessionLocal(name, 'json');
  },
  removeSessionLocal(name) {
    if (window.sessionStorage && JSON && name) {
      window.sessionStorage.removeItem(name);
    }
    return null;
  },
  renderDatas(datas, key, name, values) {
    let result = [];
    if(datas&&values){
      let map = new Map();
      for (let data of datas) {
        map.set(String(data[key]), String(data[name]));
      }
      for (let value of values) {
        if(map.get(value)){
          result.push(map.get(value));
        }
      }
    }
    return result;
  }
});
