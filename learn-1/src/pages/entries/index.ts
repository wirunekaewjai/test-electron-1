import { html } from 'htm/react';
import { useState, useEffect } from 'react';
import { DataStore, OpType } from '@aws-amplify/datastore';
import { Entry } from 'src/models';

import Container from 'src/components/container';
import Card from 'src/components/card';

import Table from 'src/components/table';
import TableHead from 'src/components/table-head';
import TableRow from 'src/components/table-row';
import TableCell from 'src/components/table-cell';

import ScrollView from 'src/components/scroll-view';
import Link from 'src/components/link';

export default function Page ()
{
  const [items, setItems] = useState<Entry[]>(undefined);
  const [name, setName] = useState('');

  function onChange (ev: Event)
  {
    const target = ev.target as HTMLInputElement;
    setName(target.value);
  }

  async function onSubmit (ev: Event)
  {
    ev.preventDefault();

    await DataStore.save(new Entry({
      name,
    }));

    setName('');
  }

  function onDelete (id: string)
  {
    return async function handler ()
    {
      await DataStore.delete(Entry, id);
    }
  }

  function sort (entries: Entry[])
  {
    return entries.sort((a, b) => {
      return a.id.localeCompare(b.id);
    });
  }

  useEffect(() =>
  {
    DataStore.query(Entry).then(entries => setItems(sort(entries)));
  }, []);

  useEffect(() => {
    const sub = DataStore.observe(Entry).subscribe(async (msg) => {
      if (msg.opType === OpType.INSERT)
      {
        const entries = sort(items.concat(msg.element));
        setItems(entries);
      }
      else if (msg.opType === OpType.UPDATE)
      {
        const entries = items.map(e => {
          if (e.id === msg.element.id)
          {
            return msg.element;
          }

          return e;
        });

        setItems(entries);
      }
      else if (msg.opType === OpType.DELETE)
      {
        const entries = items.filter(e => e.id !== msg.element.id);
        setItems(entries);
      }
    });

    return function ()
    {
      sub?.unsubscribe();
    }
  }, [items, setItems]);

  return html`
  <${Container}>
    <h1>
      # Entries
    </h1>

    <!-- Table -->
    <${Card}>
      <${ScrollView} height=300px >
        <${Table} sticky >
          <${TableHead}>
            <${TableRow}>
              <${TableCell} component="th" width=200 >
                ID
              <//>
              <${TableCell} component="th">
                Name
              <//>
              <${TableCell} component="th" width=10>
                
              <//>
            <//>
          <//>
          <tbody>
            ${
              !items ?
              html`
              <${TableRow}>
                <${TableCell} align="center" colSpan=3 >
                  กำลังโหลด . . .
                <//>
              <//>
              `
              :
              items.length === 0 ?
              html`
              <${TableRow}>
                <${TableCell} align="center" colSpan=3 >
                  ไม่มีข้อมูล
                <//>
              <//>
              `
              :
              items.map(item => (
                html`
                <${TableRow} hover >
                  <${TableCell}>
                    ${item.id}
                  <//>
                  <${TableCell}>
                    <${Link}
                      page="entry"
                      props=${{ entryID: item.id }}
                    >
                      ${item.name}
                    <//>
                  <//>
                  <${TableCell}>
                    <button onClick=${onDelete(item.id)} >
                      ลบ
                    </button>
                  <//>
                <//>
                `
              ))
            }
          </tbody>
        <//>
      <//>
    <//>

    <!-- Form -->
    ${
      items ?
      html`
      <br />
      <form
        onSubmit=${onSubmit}
      >
        <input
          value=${name}
          onChange=${onChange}
        />
        <button
          type="submit"
        >
          เพิ่ม
        </button>
      </form>
      `
      :
      ''
    }
  <//>
  `;
}