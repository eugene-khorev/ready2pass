export default {
  render() {
    this.$auth.logout()
      .then(function() {
        this.$router.replace({ path: '/login' });
      }.bind(this))
      .catch(function(error) {
        console.log(error);
      }.bind(this));
  },
}
