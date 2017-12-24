require('./bootstrap');

import Vue from 'vue';
import VueRouter from 'vue-router';

import Trans from './plugins/trans';
import OAuth from './plugins/oauth';

import App from './components/app-container.vue';
import Login from './pages/login.vue';
import Register from './pages/register.vue';
import Passwords from './pages/passwords.vue';
import Logout from './pages/logout.vue';

const appBlock = document.getElementById('app');
const messages = $(appBlock).data('messages');

Vue.use(Trans, { messages });
Vue.use(OAuth);

const routes = [
  { path: '/login',     title: 'navigation.login',      component: Login,     protected: false, beforeEnter: (to, from, next) => { next( !localStorage.getItem('accessToken')) } },
  { path: '/register',  title: 'navigation.register',   component: Register,  protected: false, beforeEnter: (to, from, next) => { next( !localStorage.getItem('accessToken')) } },
  { path: '/passwords', title: 'navigation.passwords',  component: Passwords, protected: true,  beforeEnter: (to, from, next) => { next(!!localStorage.getItem('accessToken')) } },
  { path: '/logout',    title: 'navigation.logout',     component: Logout,    protected: true,  beforeEnter: (to, from, next) => { next(!!localStorage.getItem('accessToken')) } },
];

Vue.use(VueRouter);

const router = new VueRouter({ routes });
const app = new Vue({
  router,

  template: '<App :routes="routes" />',

  components: {
    App,
  },

  data: function () {
    return {
      routes
    }
  },
}).$mount('#app');
