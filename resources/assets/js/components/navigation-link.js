export default {
  props: [
    'hash',
    'title'
  ],

  computed: {
    isActive: function () {
      return (this.hash === window.location.hash);
    }
  }
}
