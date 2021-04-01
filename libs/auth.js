
let auth = Math.random();

export default {
  getAuth: function() {
    return auth || (auth = Math.random());
  }
};
