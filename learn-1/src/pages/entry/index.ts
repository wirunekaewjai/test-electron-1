import { html } from 'htm/preact';
// import { useState } from 'preact/hooks';

import Container from 'src/components/container';
import Link from 'src/components/link';

// import classes from './style';
import { Props } from './types';

export default function Page ({
  entryID,
}: Props)
{
  return html`
  <${Container}>
    <h1>
      # Entry ${entryID}
    </h1>
    <${Link} page="entries">
      Back
    <//>
  <//>
  `;
}