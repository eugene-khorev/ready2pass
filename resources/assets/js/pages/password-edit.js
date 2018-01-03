import PasswordForm from './../components/password-form.vue';

export default {
  data: function () {
    return {
      password: {},
      isInputDisabled: true,
    };
  },

  components: {
    PasswordForm,
  },

  mounted() {
    if (this.$route.path == '/passwords/new') {
      this.isInputDisabled = false;
    } else {
      this.$api.getUserPasswordItem(this.$route.params.id)
        .then(function(response) {
          this.password = response.data.data;
          this.isInputDisabled = false;
        }.bind(this))
        .catch(function(error) {
          console.log(error);
        }.bind(this));
    }
  }
}
