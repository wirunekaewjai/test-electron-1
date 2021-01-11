import Vue from 'vue';

import { Route, NavigationGuardNext } from 'vue-router';
import { mapState, mapMutations } from 'vuex';

import { Hub } from '@aws-amplify/core';
import { Auth } from '@aws-amplify/auth';

import config from './aws-exports';

import CommonSnackbar from '@/components/common-snackbar/template.vue';

const authRoutes = [
  '/sign-in', 
  '/sign-up', 
  '/forgot-password',
];

export default Vue.extend({
  components: {
    CommonSnackbar,
  },

  data: () => ({
    unsubscribes: [] as Function[],
  }),

  computed: {
    ...mapState(['ready']),
  },

  methods: {
    ...mapMutations(['setReady']),

    onRouteBeforeEach (to: Route, from: Route, next: NavigationGuardNext) {
      // console.log(from.fullPath, to.fullPath);

      if (!this.ready) {
        next();
        return;
      }

      const isToAuthRoute = authRoutes.includes(to.path);

      Auth
      .currentAuthenticatedUser()
      .then(() => {
        if (isToAuthRoute) {
          if (typeof to.query.redirect === 'string' && to.query.redirect.length > 0)
          {
            next(decodeURIComponent(to.query.redirect));
          }
          else
          {
            next('/');
          }
        }
        else {
          next();
        }
      })
      .catch(() => {
        if (!isToAuthRoute)
        {
          next({
            path: '/sign-in',
            query: {
              redirect: encodeURIComponent(to.fullPath),
            },
          });
        }
        else
        {
          next();
        }
      });
    },

    onAuthStateChanged () {
      const router = this.$router;
      const route = router.currentRoute;

      const inAuthRoute = authRoutes.includes(route.path);

      Auth
      .currentAuthenticatedUser()
      .then(async (user) => {
        if (inAuthRoute) {
          if (typeof route.query.redirect === 'string' && route.query.redirect.length > 0)
          {
            router.push({
              path: decodeURIComponent(route.query.redirect),
            });
          }
          else
          {
            router.push({
              path: '/',
            });
          }
        }
      })
      .catch(() => {
        if (!inAuthRoute) {
          router.push({
            path: '/sign-in',
            query: {
              redirect: encodeURIComponent(route.fullPath),
            },
          });
        }
      })
      .finally(() => {
        this.setReady();
      });
    },

    async onValidateCustomTheme () {
      console.log('theme: validate');

      try {
        const user = await Auth.currentAuthenticatedUser();
        const attrs = await Auth.userAttributes(user);

        for (const attr of attrs) {
          if (attr.Name === 'custom:theme') {
            this.$vuetify.theme.dark = attr.Value === 'dark';
          }
        }
      }
      catch {
        this.$vuetify.theme.dark = false;
      }
    }
  },

  mounted () {
    this.$router.beforeEach(this.onRouteBeforeEach);

    this.unsubscribes.push(
      Hub.listen('auth', async (cap) => {
        const event = cap.payload.event;
        console.log('auth:', event);

        if (event === 'configured') {
          await this.onValidateCustomTheme();
          this.onAuthStateChanged();
        }
        else if (event === 'signIn')
        {
          await this.onValidateCustomTheme();
          this.onAuthStateChanged();
        }
        else if (event === 'signOut')
        {
          this.$vuetify.theme.dark = false;
          this.onAuthStateChanged();
        }
        // else if (event === 'tokenRefresh') {
        //   await this.onValidateCustomTheme();
        // }
      })
    );

    // this.unsubscribes.push(
    //   Hub.listen('datastore', (e) => {
    //     console.log('datastore:', e.payload.event);
    //   })
    // );

    // Amplify.configure(config);
    Auth.configure(config);
  },

  beforeDestroy () {
    for (const unsubscribe of this.unsubscribes) {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    }
  },
});