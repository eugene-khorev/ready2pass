export default {
  data: function() {
    return {
      isInputDisabled: false,
      email: '',
      password: '',
    }
  },

  methods: {
    onLogin: function() {
      this.isInputDisabled = true;
      this.$auth.authenticate(this.email, this.password,)
        .then(function() {
          this.isInputDisabled = false;
          this.$emit('authenticated');
        }.bind(this))
        .catch(function(error) {
          this.isInputDisabled = false;
          this.$emit('unauthenticated');
          console.log(error);
        }.bind(this));
    },
  }
};
