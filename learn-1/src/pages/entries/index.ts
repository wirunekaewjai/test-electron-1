import { html } from 'htm/preact';
// import { useState } from 'preact/hooks';

// import classes from './style';
import Table from 'src/components/table';
import TableRow from 'src/components/table-row';
import TableCell from 'src/components/table-cell';

export default function Page ()
{
  return html`
  <h1>
    # Entries
  </h1>
  <${Table}>
    <thead>
      <${TableRow}>
        <${TableCell} component="th" >
          ID
        <//>
        <${TableCell} component="th">
          Name
        <//>
      <//>
    </thead>
    <tbody>
      <${TableRow} hover >
        <${TableCell}>
          001
        <//>
        <${TableCell}>
          Hello, World
        <//>
      <//>
    </tbody>
  <//>
  `;
}