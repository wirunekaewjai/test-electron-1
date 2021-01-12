import Vue from 'vue';
import { Auth } from '@aws-amplify/auth';

export default Vue.extend({
  name: 'component-console-toolbar-bulb',
  
  methods: {
    async toggle () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;

      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, { 'custom:theme': this.$vuetify.theme.dark ? 'dark' : 'light' });
    },
  },
});