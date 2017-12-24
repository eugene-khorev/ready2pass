import _get from 'lodash/get';

const Trans = {
  install: function(Vue, options) {
    Vue.prototype.$trans = function(key) {
      return _get(options, 'messages.' + key, key);
    };
  },
}

export default Trans;
