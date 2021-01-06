import { ipcRenderer } from 'electron';
import { html } from 'htm/preact';
import { useState } from 'preact/hooks';
import { Auth, CognitoUser } from '@aws-amplify/auth';

import Container from 'src/components/container';

import { Props } from './types';

export default function Page ({ page, props }: Props)
{
  const [values, setValues] = useState({ username: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  function onChange (ev: Event)
  {
    const target = ev.target as HTMLInputElement;
    setValues(values => ({ ...values, [target.name]: target.value }));
  }

  async function changePassword (user: CognitoUser)
  {
    return new Promise (resolve =>
      {
        user.completeNewPasswordChallenge(values.password, null, {
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

  async function signIn ()
  {
    try
    {
      const user = await Auth.signIn(
        values.username,
        values.password,
      );

      if (user.challengeName === 'NEW_PASSWORD_REQUIRED')
      {
        return await changePassword(user);
      }

      return;
    }
    catch (err)
    {
      console.log(err);
      return 'Invalid username or password';
    }
  }

  async function onSubmit (ev: Event)
  {
    ev.preventDefault();

    setSubmitting(true);

    const st = Date.now();

    const err = await signIn();

    const et = Date.now();
    const usage = et - st;

    if (usage < 1000)
    {
      await new Promise(r => setTimeout(r, 1000 - usage));
    }

    setSubmitting(false);
    
    if (err)
    {
      alert(err);
    }
    else
    {
      ipcRenderer.send('navigate', page, props);
    }
  }

  return html`
  <${Container}>
    <h1>
      # Sign In
    </h1>
    
    <form onsubmit=${onSubmit} >

      <fieldset>
        <label>
          Username: 
        </label>
        <input
          type="text"
          name="username"
          value=${values.username}
          oninput=${onChange}
        />
      </fieldset>

      <fieldset>
        <label>
          Password: 
        </label>
        <input
          type="password"
          name="password"
          value=${values.password}
          oninput=${onChange}
        />
      </fieldset>

      <button
        type="submit"
        disabled=${submitting}
      >
        ${submitting ? 'กำลังเข้าสู่ระบบ' : 'เข้าสู่ระบบ'}
      </button>
    </form>
  <//>
  `;
}