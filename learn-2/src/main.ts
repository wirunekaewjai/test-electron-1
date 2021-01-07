import Vue from 'vue';
import App from './app/index.vue';
import Amplify, { Hub } from '@aws-amplify/core';
import Auth, { CognitoUser } from '@aws-amplify/auth';
import { DataStore } from '@aws-amplify/datastore';

import config from './aws-exports';

Vue.config.productionTip = false;

Amplify.configure(config);

async function getUser ()
{
  try
  {
    const user: CognitoUser = await Auth.currentAuthenticatedUser();
    // 

    return user;
  }
  catch (err)
  {
    // console.log(err);
    return undefined;
  }
}

function getUserGroups (user?: CognitoUser)
{
  const payload = user?.getSignInUserSession()?.getAccessToken().decodePayload();
  return payload?.["cognito:groups"] as string[];
}

new Vue({
  data: {
    state: 'none',

    user: undefined as CognitoUser | undefined,
    page: 'entries',
    props: undefined as any,
  },

  created: async function () {
    this.user = await getUser();
  },

  mounted: async function () {
    window.ipcRenderer.on('set', async (_, key: string, value: any) => {
      if (key === 'state')
      {
        if (value === 'signed-out')
        {
          this.state = 'authentication';
          this.page = 'entries';
          this.props = undefined;
          this.user = undefined;

          await DataStore.stop();
          await DataStore.clear();

          await Auth.signOut();
        }
        else if (value === 'signed-in')
        {
          this.state = 'signed-in';

          if (!this.user)
          {
            this.user = await getUser();
          }

          await DataStore.start();
        }
        else
        {
          this.state = value;
        }
      }
    });

    window.ipcRenderer.on('navigate', async (_, page: string, props: any) => {
      this.page = page;
      this.props = props;
    });

    Hub.listen('datastore', (e) =>
    {
      // console.log(e.payload.event);

      if (e.payload.event === 'ready' && this.state === 'signed-in')
      {
        this.state = 'ready';
      }
    });

    if (this.user)
    {
      if (this.state !== 'signed-in')
      {
        window.ipcRenderer.send('set', 'state', 'signed-in');
      }
    }
    else if (this.state !== 'authentication')
    {
      window.ipcRenderer.send('set', 'state', 'authentication');
    }
  },

  render: function (h) {
    return h(App, {
      props: {
        state: this.state,
        page: this.page,
        props: {
          ...this.props,
  
          groups: getUserGroups(this.user),
        },
      },
    });
  },
}).$mount('#app');
