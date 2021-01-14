import Vue from 'vue';

import { mapState, mapMutations } from 'vuex';

import { Auth } from '@aws-amplify/auth';
import { Storage } from '@aws-amplify/storage';

import ConsoleToolbar from '@/components/console-toolbar/template.vue';
import ConsoleToolbarBulb from '@/components/console-toolbar-bulb/template.vue';
import ConsoleToolbarUserDropdown from '@/components/console-toolbar-user-dropdown/template.vue';

export default Vue.extend({
  name: 'view-profile',

  components: {
    ConsoleToolbar,
    ConsoleToolbarBulb,
    ConsoleToolbarUserDropdown,
  },

  data () {
    return {
      file: undefined as File | undefined,
      rules: [
        (value: File) => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
      ],
    };
  },
  
  computed: {
    ...mapState('auth', { user: 'user' }),
  },

  methods: {
    ...mapMutations('auth', { updateUser: 'update' }),

    async upload () {
      const file = this.file as File;

      const session = await Auth.currentSession();
      const sub = session.getIdToken().payload['sub'];
      const key = `/private/${sub}/${file.name}`;

      try {
        await Storage.put(key, file, {
          level: 'private',
          contentType: file.type,
        });

        await this.notify(key);

        const user = await Auth.currentAuthenticatedUser();
        await Auth.updateUserAttributes(user, { 'custom:photo': key });
      }
      catch (err) {
        console.log(err);
      }
    },

    async notify (key: string) {

      const payload = { ...this.user };

      payload.photo = await Storage.get(key, { level: 'private' }) as string;

      this.updateUser(payload);
    },
  },
});