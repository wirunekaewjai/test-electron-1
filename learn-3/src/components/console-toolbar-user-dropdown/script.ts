import Vue from 'vue';
import { mapState } from 'vuex';
import { Auth } from '@aws-amplify/auth';

import CommonAvatar from '@/components/common-avatar/template.vue';

export default Vue.extend({
  name: 'component-console-toolbar-user-dropdown',
  components: {
    CommonAvatar,
  },

  computed: {
    ...mapState('auth', { user: 'user' }),
  },
 
  methods: {
    async signOut () {
      await new Promise(r => setTimeout(r, 300));
      await Auth.signOut();
    },
  },
});