import Vue from 'vue';
import { mapMutations } from 'vuex';
import { DataStore } from '@aws-amplify/datastore';

import * as Yup from 'yup';

import { Wallet } from '@/models';

interface FormValues {
  name: string;
}

const schema = Yup.object().shape({
  'name': Yup.string().min(1).max(250).required(),
});

export default Vue.extend({
  name: 'component-dialog-create-wallet',

  components: {

  },

  data: () => ({
    open: false,

    submitting: false,

    values: {
      name: '',
    },

    errors: {
      name: '',
    },

    toucheds: {
      name: false,
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
      await this.validate('name');

      if (this.errors.name) {
        return;
      }

      await this.create();
      this.close();
    },

    async create () {
      this.submitting = true;

      await DataStore.save(
        new Wallet({
          name: this.values.name,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      );

      this.submitting = false;
      this.setSnackbar('Wallet has been created.');
    },

    close () {
      this.values.name = '';
      this.errors.name = '';
      this.toucheds.name = false;
      this.open = false;
    },
  },
});