import Password from './../components/password.vue';

export default {
  data: function () {
    return {
      items: [],
    };
  },

  components: {
    Password,
  },

  mounted() {
    this.$api.getUserPasswords()
      .then(function(response) {
        this.items = response.data.data.items;
      }.bind(this))
      .catch(function(error) {
        console.log(error);
      }.bind(this));
  }
}
