import Vue from 'vue';
import App from './app/index.vue';
import { Amplify, Hub } from '@aws-amplify/core';
import { Auth, CognitoUser } from '@aws-amplify/auth';
import { DataStore } from '@aws-amplify/datastore';

import config from './aws-exports';

Vue.config.productionTip = false;

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
    Hub.listen('auth', async (e) => {
      const event = e.payload.event;

      // console.log('hub:auth', event);

      if (event === 'configured')
      {
        this.user = await getUser();
        
        if (this.user)
        {
          this.state = 'signed-in';
          await DataStore.start();
        }
        else
        {
          this.state = 'authentication';
        }
      }
      else if (event === 'signIn')
      {
        this.user = await getUser();
        this.state = 'signed-in';

        await DataStore.start();
      }
      else if (event === 'signOut')
      {
        await DataStore.stop();

        this.state = 'authentication';
        this.page = 'entries';
        this.props = undefined;
        this.user = undefined;
      }
    });

    Hub.listen('datastore', (e) =>
    {
      // console.log('hub:datastore', e.payload.event);

      if (e.payload.event === 'ready' && this.state === 'signed-in')
      {
        this.state = 'ready';
      }
    });

    window.ipcRenderer.on('navigate', async (_, page: string, props: any) => {
      this.page = page;
      this.props = props;
    });

    Amplify.configure(config);
  },

  // mounted: async function () {
  //   // if (this.user)
  //   // {
  //   //   if (this.state !== 'signed-in')
  //   //   {
  //   //     window.ipcRenderer.send('set', 'state', 'signed-in');
  //   //   }
  //   // }
  //   // else if (this.state !== 'authentication')
  //   // {
  //   //   window.ipcRenderer.send('set', 'state', 'authentication');
  //   // }
  // },

  render: function (h) {
    // console.log(this.state, this.page, this.props, this.user);
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
