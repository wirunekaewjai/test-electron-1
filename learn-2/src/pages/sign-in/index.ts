import Vue from 'vue';
import { Auth, CognitoUser } from '@aws-amplify/auth';

import Container from '../../components/container/index.vue';

async function changePassword (user: CognitoUser, newPassword: string)
{
  return new Promise (resolve =>
    {
      user.completeNewPasswordChallenge(newPassword, null, {
        onSuccess: (session) =>
        {
          resolve(undefined);
        },
        onFailure: (err) =>
        {
          resolve('invalid new password');
        },
      });
    });
}

async function signIn (username: string, password: string)
{
  try
  {
    const user = await Auth.signIn(
      username,
      password,
    );

    if (user.challengeName === 'NEW_PASSWORD_REQUIRED')
    {
      return await changePassword(user, password);
    }

    return;
  }
  catch (err)
  {
    console.log(err);
    return 'Invalid username or password';
  }
}

export default Vue.extend({
  name: 'PageSignIn',
  props: {
    page: String,
    props: {
      type: Object,
      required: false,
    },
  },
  data: function () {
    return {
      username: '',
      password: '',
      submitting: false,
    };
  },
  components: {
    'wk-container': Container,
  },
  methods: {
    submit: async function () {
      this.submitting = true;

      const st = Date.now();

      const err = await signIn(this.username, this.password);

      const et = Date.now();
      const usage = et - st;

      if (usage < 1000)
      {
        await new Promise(r => setTimeout(r, 1000 - usage));
      }

      this.submitting = false;
      
      if (err)
      {
        alert(err);
      }
      else
      {
        // window.ipcRenderer.send('set', 'state', 'signed-in');
        // window.ipcRenderer.send('navigate', this.page, this.props);
      }
    },
  },
});