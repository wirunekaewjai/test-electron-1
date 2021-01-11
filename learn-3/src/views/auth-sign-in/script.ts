import Vue from 'vue';
import { mapMutations } from 'vuex';
import { Auth } from '@aws-amplify/auth';

import Layout from '@/layouts/auth/template.vue';

import * as Yup from 'yup';

interface FormValues {
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  'email': Yup.string().email().required(),
  'password': Yup.string().min(8).max(36).required(),
});

export default Vue.extend({
  name: 'view-sign-in',
  components: {
    Layout,
  },

  data: () => ({
    values: {
      email: '',
      password: '',
    },

    errors: {
      email: '',
      password: '',
    },

    toucheds: {
      email: false,
      password: false,
    },

    submitting: false,
    passwordVisible: false,
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
      await this.validate('email');
      await this.validate('password');

      if (this.errors.email || this.errors.password) {
        return;
      }

      await this.signInWithEmail();
    },

    async signInWithEmail () {
      this.submitting = true;

      try {
        await Auth.signIn({
          username: this.values.email,
          password: this.values.password,
        });
      }
      catch (err) {
        this.setSnackbar('Invalid email or password');
      }
      
      this.submitting = false;
    },
  },
});