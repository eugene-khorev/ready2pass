export default {
  data: function() {
    return {
      isInputDisabled: false,
      email: '',
      password: '',
      errors: {},
    }
  },

  methods: {
    onLogin: function() {
      this.isInputDisabled = true;
      this.errors = {};

      this.$api.authenticate(this.email, this.password,)
        .then(function() {
          this.isInputDisabled = false;
          this.$emit('authenticated');
        }.bind(this))
        .catch(function(error) {
          this.isInputDisabled = false;
          this.errors = error.response.data.error || {};
          this.$emit('unauthenticated');
        }.bind(this));
    },
  }
};
