/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import routes from './routes';
import oauth from './oauth';

window.Vue = require('vue');

const app = new Vue({
  el: '#app',

  data: {
    currentRoute: window.location.hash,
  },

  computed: {
    view() {
      const matchingView = routes[this.currentRoute];
      return (matchingView && matchingView.isProtected === oauth.isUserAuthorized())
        ? require('./pages/' + matchingView.component)
        : require('./pages/404.vue');
    }
  },

  render(h) {
    return h(this.view);
  }
});

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.hash
});
