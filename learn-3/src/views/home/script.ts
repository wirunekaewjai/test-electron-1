import Vue from 'vue';
import { Auth } from '@aws-amplify/auth';

export default Vue.extend({
  name: 'view-home',

  // async created () {
  //   const user = await Auth.currentAuthenticatedUser();
  //   const attrs = await Auth.userAttributes(user);

  //   for (const attr of attrs) {
  //     if (attr.Name === 'custom:theme') {
  //       this.$vuetify.theme.dark = attr.Value === 'dark';
  //     }
  //   }
  // },

  methods: {
    async signOut () {
      await Auth.signOut();
    },

    async setLight () {
      await this.setTheme('light');
    },

    async setDark () {
      await this.setTheme('dark');
    },

    async setTheme (theme: string) {
      this.$vuetify.theme.dark = theme === 'dark';

      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, { 'custom:theme': theme });
    },
  },
});