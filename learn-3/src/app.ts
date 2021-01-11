import Vue from 'vue';
import { Route, NavigationGuardNext } from 'vue-router';
import { mapState, mapMutations } from 'vuex';

const authRoutes = ['/sign-in', '/sign-up', '/forgot-password'];

export default Vue.extend({
  data: () => ({
    // ready: false,
    // unsubscribes: [] as Function[],
  }),

  computed: {
    ...mapState(['ready']),
  },

  methods: {
    ...mapMutations(['setReady']),

    ...mapMutations('user', {
      notifyUserChanged: 'notifyChanged',
    }),

    // onRouteBeforeEach (to: Route, _: Route, next: NavigationGuardNext) {
    //   if (!this.ready)
    //   {
    //     next();
    //     return;
    //   }

    //   const user = firebase.auth().currentUser;
    //   const isToAuthRoute = authRoutes.includes(to.path);

    //   if (user)
    //   {
    //     if (isToAuthRoute)
    //     {
    //       if (typeof to.query.redirect === 'string' && to.query.redirect.length > 0)
    //       {
    //         next(decodeURIComponent(to.query.redirect));
    //       }
    //       else
    //       {
    //         next('/');
    //       }
    //     }
    //     else
    //     {
    //       next();
    //     }
    //   }
    //   else if (!isToAuthRoute)
    //   {
    //     next({
    //       path: '/sign-in',
    //       query: {
    //         redirect: encodeURIComponent(to.fullPath),
    //       },
    //     });
    //   }
    //   else
    //   {
    //     next();
    //   }
    // },

  },

  mounted () {
    // this.$router.beforeEach(this.onRouteBeforeEach);
    
  },
});