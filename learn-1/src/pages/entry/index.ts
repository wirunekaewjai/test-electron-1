import { html } from 'htm/preact';
// import { useState } from 'preact/hooks';

// import classes from './style';
import { Props } from './types';

export default function Page ({
  entryID,
}: Props)
{
  return html`
  <h1>
    # Entry ${entryID}
  </h1>
  `;
}