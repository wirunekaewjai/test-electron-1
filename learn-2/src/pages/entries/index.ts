import Vue from 'vue';
import { Hub } from '@aws-amplify/core';
import { Auth } from '@aws-amplify/auth';
import { DataStore, OpType, SortDirection } from '@aws-amplify/datastore';
import { Entry } from '../../models';

import Container from '../../components/container/index.vue';
import Card from '../../components/card/index.vue';
import Link from '../../components/link/index.vue';

import ScrollView from '../../components/scroll-view/index.vue';

interface Subscription {
  unsubscribe: Function;
}

const LIMIT = 3;

async function signOut ()
{
  // await DataStore.clear();
  // await Auth.signOut();

  // window.ipcRenderer.send('navigate', 'entries');
  window.ipcRenderer.send('set', 'state', 'signed-out');
}

export default Vue.extend({
  name: 'PageEntries',
  components: {
    'wk-container': Container,
    'wk-card': Card,
    'wk-link': Link,
    'wk-scroll-view': ScrollView,
  },
  props: {
    groups: Array,
  },
  data: function () {
    return {
      items: [] as Entry[],
      loading: true,
      more: false,
      name: '',

      // ready: false,
      // removeListeners: [] as Function[],
      subscriptions: [] as Subscription[],
    };
  },

  mounted: async function () {
    
    // if (!this.ready)
    // {
    //   await this.init();
    //   this.ready = true;
    // }

    await this.load();

    this.subscribe();
  },

  beforeDestroy: async function () {
    this.unsubscribe();

    // for (const removeListener of this.removeListeners)
    // {
    //   removeListener?.();
    // }

    // await DataStore.stop();
  },

  methods: {
    // init: async function () {
    //   await this.listen();
    // },

    // listen: function () {
    //   return new Promise (resolve => {
    //     const removeListener = Hub.listen('datastore', (e) =>
    //     {
    //       if (e.payload.event === 'ready')
    //       {
    //         resolve(undefined);
    //       }
    //       // else
    //       // {
    //         console.log(e.payload.event);
    //       // }
    //     });

    //     if (removeListener)
    //     {
    //       this.removeListeners.push(removeListener);
    //     }
    //   });
    // },

    load: async function (after?: Entry) {
      this.loading = true;

      const st = Date.now();
      const entries = await DataStore
      .query(Entry, e => {
        if (!after)
        {
          return e;
        }
  
        return e.updatedAt('lt', after.updatedAt).id('ne', after.id);
      }, {
        sort: s => s.updatedAt(SortDirection.DESCENDING),
        limit: LIMIT + 1,
      });

      const es = entries.slice(0, LIMIT);
      const et = Date.now();

      const usage = et - st;

      if (usage < 300)
      {
        await new Promise(r => setTimeout(r, 300 - usage));
      }

      this.items = [...this.items, ...es];
      this.loading = false;
      this.more = entries.length === LIMIT + 1;
    },

    loadMore: async function () {
      await this.load(this.items[this.items.length - 1]);
    },

    subscribe: function () {
      this.unsubscribe();

      const sub1 = DataStore.observe(Entry).subscribe(async (msg) => {
        if (msg.opType === OpType.UPDATE)
        {
          const entries = this.items.map(e => {
            if (e.id === msg.element.id)
            {
              return msg.element;
            }
  
            return e;
          });
  
          this.items = entries;
        }
        else if (msg.opType === OpType.DELETE)
        {
          const entries = this.items.filter(e => e.id !== msg.element.id);
          this.items = entries;
        }
      });
  
      const sub2 = this.items.length > 0 ? DataStore
      .observe(Entry, e => {
        return e.updatedAt('gt', this.items[0].updatedAt);
      })
      .subscribe(async (msg) => {
        if (msg.opType === OpType.INSERT)
        {
          this.items = [msg.element,  ...this.items];
        }
      }) : undefined;

      if (sub1)
      {
        this.subscriptions.push(sub1);
      }

      if (sub2)
      {
        this.subscriptions.push(sub2);
      }
    },

    unsubscribe: function () {
      for (const subscription of this.subscriptions)
      {
        if (subscription?.unsubscribe)
        {
          subscription.unsubscribe();
        }
      }

      this.subscriptions = [];
    },

    add: async function () {
      await DataStore.save(new Entry({
        name: this.name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));

      this.name = '';
    },
    remove: async function (id: string) {
      await DataStore.delete(Entry, id);
    },
    
    signOut,
  },
});