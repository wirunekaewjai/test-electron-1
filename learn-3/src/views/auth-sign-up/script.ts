import Vue from 'vue';
import { mapMutations } from 'vuex';
import { Auth } from '@aws-amplify/auth';

import Layout from '@/layouts/auth/template.vue';

import * as Yup from 'yup';

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  'name': Yup.string().min(1).max(250,).required(),
  'email': Yup.string().email().required(),
  'password': Yup.string().min(6).max(36).required(),
});

export default Vue.extend({
  name: 'view-sign-up',
  components: {
    Layout,
  },
  data: () => ({
    values: {
      name: '',
      email: '',
      password: '',
    },

    errors: {
      name: '',
      email: '',
      password: '',
    },

    toucheds: {
      name: false,
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
      await this.validate('name');
      await this.validate('email');
      await this.validate('password');

      if (this.errors.name || this.errors.email || this.errors.password) {
        return;
      }

      await this.signUp();
    },

    async signUp () {
      this.submitting = true;

      try {
        const result = await Auth.signUp({
          username: this.values.email,
          password: this.values.password,
          attributes: {
            name: this.values.name,
          },
        });

        console.log(result);

        this.setSnackbar('Your account has been created.');

        await new Promise(r => setTimeout(r, 500));

        this.$router.push({
          path: '/sign-in',
          query: this.$route.query,
        });
      }
      catch (err)
      {
        this.setSnackbar(err?.message ?? 'Something wrong...');
      }
      
      this.submitting = false;
    },
  },
});