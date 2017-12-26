require('./bootstrap');

import Vue from 'vue';
import VueRouter from 'vue-router';
import _find from 'lodash/find';

import Trans from './plugins/trans';
import Api from './plugins/api';

import App from './components/app-container.vue';
import Login from './pages/login.vue';
import Register from './pages/register.vue';
import Passwords from './pages/passwords.vue';
import PasswordEdit from './pages/password-edit.vue';
import Logout from './pages/logout.vue';
import NotFound from './pages/404.vue';

const appBlock = document.getElementById('app');
const messages = $(appBlock).data('messages');

Vue.use(Trans, { messages });
Vue.use(Api);

const routes = [
  // { path: '/welcome',       title: 'navigation.welcome',        show: false, component: Welcome,      protected: false },
  { path: '/login',         title: 'navigation.login',          show: true,  component: Login,        protected: false, beforeEnter: (to, from, next) => { next( !localStorage.getItem('accessToken')) } },
  { path: '/register',      title: 'navigation.register',       show: true,  component: Register,     protected: false, beforeEnter: (to, from, next) => { next( !localStorage.getItem('accessToken')) } },
  { path: '/passwords',     title: 'navigation.passwords',      show: true,  component: Passwords,    protected: true,  beforeEnter: (to, from, next) => { next(!!localStorage.getItem('accessToken')) } },
  { path: '/passwords/:id', title: 'navigation.password-edit',  show: false, component: PasswordEdit, protected: true,  beforeEnter: (to, from, next) => { next(!!localStorage.getItem('accessToken')) } },
  { path: '/logout',        title: 'navigation.logout',         show: true,  component: Logout,       protected: true,  beforeEnter: (to, from, next) => { next(!!localStorage.getItem('accessToken')) } },
  { path: '/*',             title: 'navigation.not_found',      show: false, component: NotFound,     protected: false },
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

  created() {
    this.$api.refreshAccessToken()
    .then(function () {
      // this.$router.replace({ path: '/passwords' });
    }.bind(this))
    .catch(function () {
      this.$router.replace({ path: '/login' });
    }.bind(this));
  }
}).$mount('#app');
