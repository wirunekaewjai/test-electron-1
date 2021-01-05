import { html } from 'htm/preact';
import { Props } from './types';

import classes from './style';

export default function TableRow ({
  children,
}: Props)
{
  return html`
  <thead 
    class=${classes.head}
  >
    ${children}
  </thead>
  `;
}