
import hasValue from 'has-value';
window['hasValue'] = hasValue;

let auth = Math.random();

export default {
  getAuth: function() {
    return auth || (auth = Math.random());
  }
};
