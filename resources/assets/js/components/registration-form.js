export default {
  data: function() {
    return {
      isInputDisabled: false,
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: {},
    }
  },

  methods: {
    onRegister: function() {
      this.isInputDisabled = true;
      this.errors = {};

      this.$api.register(this.name, this.email, this.password, this.password_confirmation)
        .then(function() {
          this.isInputDisabled = false;
          this.$emit('registred');
        }.bind(this))
        .catch(function(error) {
          this.isInputDisabled = false;
          this.errors = error.response.data.error || {};
          this.$emit('unregistred');
        }.bind(this));
    },
  }
};
