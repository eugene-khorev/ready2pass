import routes from '../routes';
import NavigationLink from './navigation-link.vue';

export default {
  props: [
    'isUserAuthorized'
  ],

  data: function () {
    return {
      items: routes,
    };
  },

  components: {
    NavigationLink,
  },
};
