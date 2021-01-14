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
      name: '',
      nameChanging: false,
      nameRules: [
        (name: string) => name.length > 1 || name.length <= 80 || 'Name should be 1 - 80 character(s)',
      ],

      file: undefined as File | undefined,
      fileUploading: false,
      fileRules: [
        (value: File) => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
      ],
    };
  },
  
  computed: {
    ...mapState('auth', { user: 'user' }),
  },

  methods: {
    ...mapMutations('auth', { updateUser: 'update' }),

    async changeName () {
      this.nameChanging = true;
      
      await new Promise(r => setTimeout(r, 300));

      this.notifyNameChanged(this.name);

      this.nameChanging = false;
    },

    async upload () {
      this.fileUploading = true;

      const st = Date.now();
      
      const file = this.file as File;
      const level = 'protected';

      // const session = await Auth.currentSession();
      // const sub = session.getIdToken().payload['sub'];
      const key = `${file.name}`;

      try {
        await Storage.put(key, file, {
          level,
          contentType: file.type,
        });

        await this.notifyPhotoChanged(key, level);
      }
      catch (err) {
        console.log(err);
      }

      const et = Date.now();
      const usage = et - st;

      if (usage < 300) {
        await new Promise(r => setTimeout(r, 300 - usage));
      }

      this.fileUploading = false;
    },

    async notifyPhotoChanged (key: string, level: string) {

      const payload = { ...this.user };

      payload.photo = await Storage.get(key, { level }) as string;

      this.updateUser(payload);

      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, { 'custom:photo': key });
    },

    async notifyNameChanged (name: string) {

      this.updateUser({ ...this.user, name });

      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, { 'name': name });
    },
  },

  mounted () {
    this.name = this.user.name;
  },
});