import { html } from 'htm/react';
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