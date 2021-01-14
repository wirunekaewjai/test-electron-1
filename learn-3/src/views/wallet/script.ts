import Vue from 'vue';
import { DataStore, SortDirection, OpType } from '@aws-amplify/datastore';

import ConsoleToolbar from '@/components/console-toolbar/template.vue';
import ConsoleToolbarBulb from '@/components/console-toolbar-bulb/template.vue';
import ConsoleToolbarUserDropdown from '@/components/console-toolbar-user-dropdown/template.vue';

import DialogCreateTransaction from '@/components/dialog-create-transaction/template.vue';

import { Wallet, Transaction } from '@/models';

interface Subscription {
  unsubscribe: Function;
}

export default Vue.extend({
  name: 'view-wallet',

  components: {
    ConsoleToolbar,
    ConsoleToolbarBulb,
    ConsoleToolbarUserDropdown,

    DialogCreateTransaction,
  },

  data () {
    return {
      id: this.$route.params.walletID,
      name: 'Untitled',
      transactions: [] as Transaction[],

      loading: true,
      more: false,
      
      subscriptions: [] as Subscription[],
    };
  },

  async mounted () {
    await this.fetch();
    this.subscribe();
  },

  beforeDestroy: async function () {
    this.unsubscribe();
  },

  methods: {
    async fetch () {
      this.loading = true;
      
      try {
        const st = Date.now();
        const entry = await DataStore.query(Wallet, this.id);


        if (entry) {
          const transactions = await DataStore.query(Transaction, e => e.walletID('eq', this.id), { sort: s => s.createdAt(SortDirection.DESCENDING) });

          const et = Date.now();
          const usage = et - st;

          if (usage < 300)
          {
            await new Promise(r => setTimeout(r, 300 - usage));
          }

          this.name = entry.name;
          this.transactions = transactions;
        }
        else {
          this.redirect();
        }
      }
      catch {
        this.redirect();
      }
      // const st = Date.now();

      // try {
      //   const entry = await DataStore.query(Wallet, this.id);

      //   if (entry) {
      //     this.name = entry.name;
      //     this.transactions = await DataStore.query(Transaction, e => e.walletID('eq', this.id), { sort: s => s.createdAt(SortDirection.DESCENDING) });

      //     // this.transactions = (entry.transactions?.filter(e => !!e) ?? []) as Transaction[];
      //   }
      //   else {
      //     this.redirect();
      //   }
      // }
      // catch {
      //   this.redirect();
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

      const s1 = DataStore.observe(Wallet, this.id).subscribe(msg => {
        if (msg.opType === OpType.DELETE)
        {
          this.redirect();
        }
        else
        {
          this.name = msg.element.name;
        }
      });

      const s2 = DataStore.observe(Transaction, e => e.walletID('eq', this.id)).subscribe(async msg => {
        try {
          this.transactions = await DataStore.query(Transaction, e => e.walletID('eq', this.id), { sort: s => s.createdAt(SortDirection.DESCENDING) });
        }
        catch (err) {
          console.log(err);
        }
      });

      this.subscriptions.push(s1);
      this.subscriptions.push(s2);
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

    redirect () {
      this.$router.push('/');
    },

    async remove (transactionID: string) {
      await DataStore.delete(Transaction, transactionID);
    },
  },
});