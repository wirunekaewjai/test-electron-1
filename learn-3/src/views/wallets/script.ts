import Vue from 'vue';
import { DataStore, SortDirection, Predicates, OpType } from '@aws-amplify/datastore';

import ConsoleToolbar from '@/components/console-toolbar/template.vue';
import ConsoleToolbarBulb from '@/components/console-toolbar-bulb/template.vue';
import ConsoleToolbarUserDropdown from '@/components/console-toolbar-user-dropdown/template.vue';

import DialogCreateWallet from '@/components/dialog-create-wallet/template.vue';

import WalletTotal from '@/components/wallet-total/template.vue';

import { Wallet, Transaction } from '@/models';

interface Subscription {
  unsubscribe: Function;
}

// const LIMIT = 10;

export default Vue.extend({
  name: 'view-wallets',

  components: {
    ConsoleToolbar,
    ConsoleToolbarBulb,
    ConsoleToolbarUserDropdown,

    DialogCreateWallet,

    WalletTotal,
  },

  data: () => ({
    items: [] as Wallet[],
    loading: true,
    // more: false,

    subscriptions: [] as Subscription[],
  }),

  async mounted () {
    await this.fetch();
    this.subscribe();
  },

  async beforeDestroy () {
    this.unsubscribe();
  },

  methods: {
    async fetch () {
      this.loading = true;

      try {
        this.items = await DataStore.query(Wallet, Predicates.ALL, {
          sort: s => s.name(SortDirection.ASCENDING),
        });
      }
      catch (err) {
        console.log(err);
      }

      // const st = Date.now();

      // try {
      //   const entries = await DataStore.query(Wallet, e => {
      //     if (!after)
      //     {
      //       return e;
      //     }

      //     return e.name('lt', after.name);
      //   }, {
      //     sort: s => s.name(SortDirection.ASCENDING),
      //     limit: LIMIT + 1,
      //   });

      //   const es = entries.slice(0, LIMIT);

      //   this.items = [...this.items, ...es];
      //   this.more = entries.length === LIMIT + 1;
      // }
      // catch (err) {
      //   console.log(err);
      // }

      // const et = Date.now();

      // const usage = et - st;

      // if (usage < 300)
      // {
      //   await new Promise(r => setTimeout(r, 300 - usage));
      // }

      this.loading = false;
    },

    subscribe () {
      this.unsubscribe();

      const s1 = DataStore.observe(Wallet).subscribe(async msg => {
        try {
          this.items = await DataStore.query(Wallet, Predicates.ALL, {
            sort: s => s.name(SortDirection.ASCENDING),
          });
        }
        catch (err) {
          console.log(err);
        }
      });

      this.subscriptions.push(s1);
    },

    unsubscribe () {
      for (const subscription of this.subscriptions)
      {
        if (subscription?.unsubscribe)
        {
          subscription.unsubscribe();
        }
      }

      this.subscriptions = [];
    },

    async remove (walletID: string) {
      await DataStore.delete(Wallet, walletID);
      await DataStore.delete(Transaction, e => e.walletID('eq', walletID));
    },
  },
});