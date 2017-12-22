import NavigationLink from './navigation-link.vue';

export default {
  data: function () {
    return {
      items: [
        { hash: '#login', title: 'Login' },
        { hash: '#register', title: 'Register' },
      ],
    };
  },

  components: {
    NavigationLink,
  }
};
