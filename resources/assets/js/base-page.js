import oauth from './oauth';

export default {
  data: function() {
    return {
      auth: oauth,
    };
  },

  computed: {
    isUserAuthorized: function () {
      return this.auth.isUserAuthorized();
    }
  }
}
