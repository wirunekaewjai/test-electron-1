import Vue from 'vue';
import Link from '../../components/link/index.vue';

export default Vue.extend({
  name: 'PageEntry',
  props: {
    entryID: String,
  },
  components: {
    Link,
  },
});