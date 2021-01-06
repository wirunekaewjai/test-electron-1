import { html } from 'htm/preact';
import { Props } from './types';

import classes from './style';

export default function TableRow ({
  children,
}: Props)
{
  return html`
  <thead 
    className=${classes.head}
  >
    ${children}
  </thead>
  `;
}