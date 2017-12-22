/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import routes from './routes';

window.Vue = require('vue');

const app = new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.hash,
  },
  computed: {
    ViewComponent() {
      const matchingView = routes[this.currentRoute]
      return matchingView ?
        require('./pages/' + matchingView) :
        require('./pages/404.vue');
    }
  },
  render(h) {
    return h(this.ViewComponent);
  }
});

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.hash
});
