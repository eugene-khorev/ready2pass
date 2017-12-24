import NavigationLink from './navigation-link.vue';

export default {
  props: [
    'items',
    'isUserAuthorized',
  ],

  components: {
    NavigationLink,
  },
};
