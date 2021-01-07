import Vue from 'vue';

import PageSignIn from '../pages/sign-in/index.vue';
import PageEntries from '../pages/entries/index.vue';
import PageEntry from '../pages/entry/index.vue';

export default Vue.extend({
  name: 'app',
  props: {
    state: String,
    page: String,
    props: {
      type: Object,
      required: false,
    },
  },
  components: {
    PageSignIn,
    PageEntries,
    PageEntry,
  },
});