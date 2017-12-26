import PasswordForm from './../components/password-form.vue';

export default {
  data: function () {
    return {
      password: {},
    };
  },

  components: {
    PasswordForm,
  },

  mounted() {
    this.$api.getUserPasswordItem(this.$route.params.id)
      .then(function(response) {
        this.password = response.data.data;
      }.bind(this))
      .catch(function(error) {
        console.log(error);
      }.bind(this));
  }
}
