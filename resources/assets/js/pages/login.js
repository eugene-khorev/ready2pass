import LoginForm from '../components/login-form.vue';

export default {
  components: {
    LoginForm
  },

  methods: {
    authenticated: function () {
      this.$router.push({ path: '/passwords' });
    },
  },
}
