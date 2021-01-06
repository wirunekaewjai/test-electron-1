import { html } from 'htm/react';
import { Props } from './types';

import classes from './style';

export default function Container ({
  children,
}: Props)
{
  return html`
  <main 
    className=${classes.container}
  >
    ${children}
  </main>
  `;
}