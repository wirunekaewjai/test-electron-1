import { ipcRenderer } from 'electron';
import { html } from 'htm/preact';
import { useState, useEffect } from 'preact/hooks';
import { Auth } from '@aws-amplify/auth';
import { DataStore, OpType } from '@aws-amplify/datastore';
import { Entry } from 'src/models';

import Container from 'src/components/container';
import Link from 'src/components/link';

// import classes from './style';
import { Props } from './types';

export default function Page ({
  entryID,
}: Props)
{
  const [entry, setEntry] = useState<Entry>(undefined);
  const [saving, setSaving] = useState(false);

  function onChange (ev: Event)
  {
    const target = ev.target as HTMLInputElement;
    setEntry(e => ({ ...e, [target.name]: target.value }));
  }

  async function onSave ()
  {
    setSaving(true);

    const st = Date.now();
    const src = await DataStore.query(Entry, entryID);

    await DataStore.save(
      Entry.copyOf(src, updated => {
        updated.name = entry.name;
        updated.description = entry.description;
        updated.updatedAt = new Date().toISOString();
      })
    );

    const et = Date.now();
    const usage = et - st;

    if (usage < 1000)
    {
      await new Promise(r => setTimeout(r, 1000 - usage));
    }

    setSaving(false);
  }

  async function signOut ()
  {
    await Auth.signOut();
    ipcRenderer.send('navigate', 'entries');
  }

  useEffect(() =>
  {
    DataStore.query(Entry, entryID).then(entry => setEntry(entry));
  }, [entryID]);

  useEffect(() =>
  {
    DataStore.observe(Entry, entryID).subscribe(msg => {
      if (msg.opType === OpType.DELETE)
      {
        ipcRenderer.send('navigate', 'entries');
      }
      else
      {
        setEntry(msg.element);
      }
    });
  }, [entryID, setEntry]);

  return html`
  <${Container}>
    <h1>
      # Entry
    </h1>

    ${
      !entry ?
      html`
      <p>
        กำลังโหลด . . .
      </p>
      `
      :
      html`
      <div>
        ID: ${entry.id}
      </div>
      <div>
        Name: 
        <input
          name="name"
          value=${entry.name}
          oninput=${onChange}
        />
      </div>
      <div>
        Description:
        <input
          name="description"
          value=${entry.description ?? ''}
          oninput=${onChange}
        />
      </div>
      <div>
        <button onclick=${onSave} disabled=${saving} >
          ${saving ? 'กำลังบันทึก' : 'บันทึก'}
        </button>
      </div>
      `
    }

    <${Link} page="entries" disabled=${saving} >
      Back
    <//>

    <hr />
    <button onClick=${signOut} >
      Sign Out
    </button>
  <//>
  `;
}