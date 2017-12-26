export default {
  props: [
    'data'
  ],

  data: function() {
    console.log('data', this.data);
    return {
      isInputDisabled: false,
      errors: {},
      id: null,
      name: null,
      password: null,
      comment: null,
      icon: null,
    }
  },

  watch: {
    data: function () {
      this.id = this.data.id;
      this.name = this.data.name;
      this.password = this.data.password;
      this.comment = this.data.comment;
      this.icon = this.data.icon;
    },
  },

  methods: {
    onSave: function() {
      this.isInputDisabled = true;
      this.errors = {};

      this.$api.saveUserPasswordItem(this.id, this.name, this.password, this.comment, this.icon)
        .then(function() {
          this.isInputDisabled = false;
          this.$router.push('/passwords');
        }.bind(this))
        .catch(function(error) {
          this.isInputDisabled = false;
          this.errors = error.response.data.error || {};
        }.bind(this));
    },
  }
};
