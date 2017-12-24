import RegistrationForm from '../components/registration-form.vue';

export default {
  components: {
    RegistrationForm
  },

  methods: {
    registred: function() {
      this.$router.push({ path: '/passwords' });
    },
  }
}
