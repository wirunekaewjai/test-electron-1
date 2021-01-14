import Vue from 'vue';

import { Route, NavigationGuardNext } from 'vue-router';
import { mapState, mapMutations } from 'vuex';

import { Amplify, Hub } from '@aws-amplify/core';
import { Auth } from '@aws-amplify/auth';
import { DataStore } from '@aws-amplify/datastore';
import { Storage } from '@aws-amplify/storage';

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
    ...mapState(['status']),
  },

  methods: {
    ...mapMutations(['setStatus']),
    ...mapMutations('auth', { updateUser: 'update' }),

    onRouteBeforeEach (to: Route, from: Route, next: NavigationGuardNext) {
      // console.log(from.fullPath, to.fullPath);

      if (!['authenticating', 'ready'].includes(this.status)) {
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
      .then(async () => {
        await this.onValidateUser();

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

        this.setStatus('authenticated');

        if (this.status !== 'ready')
        {
          try {
            await DataStore.start();
          }
          catch (err) {
            console.log(err);
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

        this.setStatus('authenticating');
      });
      // .finally(() => {
      //   // this.setReady('authentication');
      // });
    },

    async onValidateUser () {
      console.log('user: validate');

      const user = await Auth.currentAuthenticatedUser();
      const attrs = await Auth.userAttributes(user);

      const payload = {
        name: '',
        email: '',
        photo: '',
      };

      for (const attr of attrs) {
        if (attr.Name === 'name') {
          payload.name = attr.Value;
        }
        else if (attr.Name === 'email') {
          payload.email = attr.Value;
        }
        else if (attr.Name === 'custom:photo') {
          const key = attr.Value;

          if (typeof key === 'string' && key.length > 0) {
            payload.photo = await Storage.get(key, { level: 'private' }) as string;
          }
        }
      }

      this.updateUser(payload);
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
          await DataStore.clear();
          await this.onValidateCustomTheme();
          
          this.onAuthStateChanged();
        }
        else if (event === 'signOut')
        {
          await DataStore.clear();
          
          this.$vuetify.theme.dark = false;
          this.onAuthStateChanged();
        }
        // else if (event === 'tokenRefresh') {
        //   await this.onValidateCustomTheme();
        // }
      })
    );

    this.unsubscribes.push(
      Hub.listen('datastore', (e) => {
        console.log('datastore:', e.payload.event);

        if (e.payload.event === 'ready') {
          this.setStatus('ready');
        }
      })
    );

    // Auth.configure(config);

    // Amplify.Logger.LOG_LEVEL = 'DEBUG';
    Amplify.configure(config);
  },

  beforeDestroy () {
    for (const unsubscribe of this.unsubscribes) {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    }
  },
});