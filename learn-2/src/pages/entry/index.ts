import Vue from 'vue';
import { Auth } from '@aws-amplify/auth';
import { DataStore, OpType } from '@aws-amplify/datastore';
import { Entry } from '../..//models';

import Container from '../../components/container/index.vue';
import Link from '../../components/link/index.vue';

interface Subscription {
  unsubscribe: Function;
}

export default Vue.extend({
  name: 'PageEntry',
  components: {
    'wk-container': Container,
    'wk-link': Link,
  },
  props: {
    entryID: String,
  },
  data: function () {
    return {
      name: '',
      description: '',
      loading: true,
      saving: false,

      subscriptions: [] as Subscription[],
    };
  },

  mounted: async function () {
    await this.load();
    
    this.subscribe();
  },

  beforeDestroy: function () {
    this.unsubscribe();
  },

  methods: {
    load: async function () {
      const entry = await DataStore.query(Entry, this.entryID);

      this.name = entry?.name ?? '';
      this.description = entry?.description ?? '';

      this.loading = false;
    },

    subscribe: function () {
      this.unsubscribe();

      const subscription = DataStore.observe(Entry, this.entryID).subscribe(msg => {
        if (msg.opType === OpType.DELETE)
        {
          window.ipcRenderer.send('navigate', 'entries');
        }
        else
        {
          this.name = msg.element.name;
          this.description = msg.element.description ?? '';
        }
      });

      this.subscriptions.push(subscription);
    },

    unsubscribe: function () {
      for (const subscription of this.subscriptions)
      {
        subscription?.unsubscribe?.();  
      }

      this.subscriptions = [];
    },

    save: async function () {
      this.saving = true;

      const st = Date.now();
      const src = await DataStore.query(Entry, this.entryID);

      await DataStore.save(
        Entry.copyOf(src as Entry, updated => {
          updated.name = this.name;
          updated.description = this.description;
          updated.updatedAt = new Date().toISOString();
        })
      );

      const et = Date.now();
      const usage = et - st;

      if (usage < 1000)
      {
        await new Promise(r => setTimeout(r, 1000 - usage));
      }

      this.saving = false;
    },
  },
});