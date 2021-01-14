import Vue from 'vue';
import { mapMutations } from 'vuex';
import { DataStore } from '@aws-amplify/datastore';

import * as Yup from 'yup';

import { Transaction } from '@/models';

interface FormValues {
  message: string;
  amount: string;
}

const schema = Yup.object().shape({
  'message': Yup.string().min(0).max(250),
  'amount': Yup.number(),
});

export default Vue.extend({
  name: 'component-dialog-create-wallet',

  components: {

  },

  props: {
    walletID: String,
  },

  data: () => ({
    open: false,

    submitting: false,

    values: {
      message: '',
      amount: '0',
    },

    errors: {
      message: '',
      amount: '',
    },

    toucheds: {
      message: false,
      amount: false,
    },
  }),

  methods: {
    ...mapMutations('snackbar', {
      setSnackbar: 'show',
    }),

    validateAsync (field: keyof FormValues): Promise<string> {
      return new Promise (resolve => {
        schema
        .validateAt(field, this.values)
        .then(() => {
          resolve('');
        })
        .catch((err: Yup.ValidationError) => {
          resolve(err.message);
        });
      });
    },

    async validate (field: keyof FormValues) {
      this.errors[field] = await this.validateAsync(field);
    },

    async blur (field: keyof FormValues) {
      this.toucheds[field] = true;
      await this.validate(field);
    },

    async input (field: keyof FormValues) {
      if (this.toucheds[field]) {
        await this.validate(field);
      }
    },

    async submit () {
      await this.validate('message');
      await this.validate('amount');

      if (this.errors.message || this.errors.amount) {
        return;
      }

      await this.create();
      this.close();
    },

    async create () {
      this.submitting = true;
      
      const amount = parseFloat(this.values.amount);
      const message = this.values.message.length > 0 ? this.values.message : amount > 0 ? 'Increase' : 'Decrease';

      await DataStore.save(
        new Transaction({
          message,
          amount,
          walletID: this.walletID,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      );

      this.submitting = false;
      this.setSnackbar('Transaction has been created.');
    },

    close () {
      this.values = { message: '', amount: '0' };
      this.errors = { message: '', amount: '' };
      this.toucheds = { message: false, amount: false };
      this.open = false;
    },
  },
});