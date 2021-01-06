import { ipcRenderer } from 'electron';
import { html, render } from 'htm/preact';
import { Auth, CognitoUser } from '@aws-amplify/auth';

import PageEntries from 'src/pages/entries';
import PageEntry from 'src/pages/entry';
import PageSignIn from 'src/pages/sign-in';

function renderRoute (Component: any, props?: any)
{
  render(html`<${Component} ...${props} />`, document.getElementById('root'));
}

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

function getUserGroups (user: CognitoUser)
{
  const payload = user.getSignInUserSession().getAccessToken().decodePayload();
  return payload["cognito:groups"] as string[];
}

export default async function init ()
{
  const user = await getUser();

  if (user)
  {
    renderRoute(PageEntries, { groups: getUserGroups(user) });
  }
  else
  {
    renderRoute(PageSignIn, { page: 'entries' });
  }

  ipcRenderer.on('navigate', async (_, page: string, props?: any) => {
    const user = await getUser();

    if (user)
    {
      if (page === 'entries')
      {
        renderRoute(PageEntries, { ...props, groups: getUserGroups(user) });
      }
      else if (page === 'entry')
      {
        renderRoute(PageEntry, { ...props, groups: getUserGroups(user) });
      }
    }
    else
    {
      renderRoute(PageSignIn, { page, props });
    }
  });
}