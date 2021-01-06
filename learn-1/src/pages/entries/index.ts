import { html } from 'htm/preact';
import { useState, useEffect } from 'preact/hooks';
import { DataStore, OpType, SortDirection } from '@aws-amplify/datastore';
import { Entry } from 'src/models';

import Container from 'src/components/container';
import Card from 'src/components/card';

import Table from 'src/components/table';
import TableHead from 'src/components/table-head';
import TableRow from 'src/components/table-row';
import TableCell from 'src/components/table-cell';

import ScrollView from 'src/components/scroll-view';
import Link from 'src/components/link';

const LIMIT = 3;

export default function Page ()
{
  const [items, setItems] = useState<Entry[]>([]);
  // const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [after, setAfter] = useState<Entry>(undefined);
  // const [limit, setLimit] = useState(LIMIT);
  // const [page, setPage] = useState(0);
  const [more, setMore] = useState(false);
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
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
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

  function loadMore ()
  {
    setAfter(items[items.length - 1]);
  }

  useEffect(() =>
  {
    setLoading(true);

    DataStore
    .query(Entry, e => {
      if (!after)
      {
        return e;
      }

      return e.updatedAt('lt', after.updatedAt).id('ne', after.id);
    }, {
      sort: s => s.updatedAt(SortDirection.DESCENDING),
      // page,
      limit: LIMIT + 1,
    })
    .then(entries => {
      const es = entries.slice(0, LIMIT);

      setItems(e => ([...e, ...es]));
      setLoading(false);
      setMore(entries.length === LIMIT + 1);
    });
  }, [after, setItems, setLoading, setMore]);

  useEffect(() => {
    const sub1 = DataStore.observe(Entry).subscribe(async (msg) => {
      if (msg.opType === OpType.UPDATE)
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

    const sub2 = items.length > 0 ? DataStore
    .observe(Entry, e => {
      return e.updatedAt('gt', items[0].updatedAt);
    })
    .subscribe(async (msg) => {
      if (msg.opType === OpType.INSERT)
      {
        setItems(es => ([msg.element,  ...es]));
      }
    }) : undefined;

    return function ()
    {
      sub1?.unsubscribe();
      sub2?.unsubscribe();
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
              <${TableCell} component="th">
                Name
              <//>
              <${TableCell} component="th" width=160 >
                CreatedAt
              <//>
              <${TableCell} component="th" width=160 >
                UpdatedAt
              <//>
              <${TableCell} component="th" width=10>
                
              <//>
            <//>
          <//>
          <tbody>
            ${
              items.length === 0 && !loading && !more ?
              html`
              <${TableRow}>
                <${TableCell} align="center" colSpan=3 >
                  ไม่มีข้อมูล
                <//>
              <//>
              `
              :
              items.map(item => {
                const createdAt = new Date(item.createdAt);
                const updatedAt = new Date(item.updatedAt);

                return (
                  html`
                  <${TableRow} key=${item.id} hover >
                    <${TableCell}>
                      <${Link}
                        page="entry"
                        props=${{ entryID: item.id }}
                      >
                        ${item.name}
                      <//>
                    <//>
                    <${TableCell}>
                      ${createdAt.toLocaleDateString()}
                      <br />
                      <small>
                        ${createdAt.toLocaleTimeString()}
                      </small>
                    <//>
                    <${TableCell}>
                      ${updatedAt.toLocaleDateString()}
                      <br />
                      <small>
                        ${updatedAt.toLocaleTimeString()}
                      </small>
                    <//>
                    <${TableCell}>
                      <button onclick=${onDelete(item.id)} >
                        ลบ
                      </button>
                    <//>
                  <//>
                  `
                )
              })
            }
            ${
              loading ?
              html`
              <${TableRow}>
                <${TableCell} align="center" colSpan=3 >
                  กำลังโหลด . . .
                <//>
              <//>
              `
              :
              html``
            }
          </tbody>
        <//>
      <//>
    <//>

    ${
      more && !loading ?
      html`
      <div>
        <button onclick=${loadMore} >
          Load More
        </button>
      </div>
      `
      :
      ''
    }

    <!-- Form -->
    ${
      items ?
      html`
      <br />
      <form
        onsubmit=${onSubmit}
      >
        <input
          value=${name}
          oninput=${onChange}
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