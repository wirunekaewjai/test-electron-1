import Vue from 'vue';
import PageEntries from '../pages/entries/index.vue';
import PageEntry from '../pages/entry/index.vue';

export default Vue.extend({
  name: 'App',
  props: {
    page: String,
    props: {
      type: Object,
      required: false,
    },
  },
  components: {
    PageEntries,
    PageEntry,
  },
});