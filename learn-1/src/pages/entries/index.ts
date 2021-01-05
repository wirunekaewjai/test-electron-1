import { html } from 'htm/preact';
// import { useState } from 'preact/hooks';

import Container from 'src/components/container';
import Card from 'src/components/card';

import Table from 'src/components/table';
import TableHead from 'src/components/table-head';
import TableRow from 'src/components/table-row';
import TableCell from 'src/components/table-cell';

import Link from 'src/components/link';

export default function Page ()
{
  return html`
  <${Container}>
    <h1>
      # Entries
    </h1>
    <${Card}>
      <${Table}>
        <${TableHead}>
          <${TableRow}>
            <${TableCell} component="th" width=64px >
              ID
            <//>
            <${TableCell} component="th">
              Name
            <//>
          <//>
        <//>
        <tbody>
          <${TableRow} hover >
            <${TableCell}>
              001
            <//>
            <${TableCell}>
              <${Link}
                page="entry"
                props=${{ entryID: '001' }}
              >
                Hello, World
              <//>
            <//>
          <//>
          <${TableRow} hover >
            <${TableCell}>
              002
            <//>
            <${TableCell}>
              <${Link}
                page="entry"
                props=${{ entryID: '002' }}
              >
                Banana
              <//>
            <//>
          <//>
        </tbody>
      <//>
    <//>
  <//>
  `;
}