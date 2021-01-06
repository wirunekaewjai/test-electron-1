import { html } from 'htm/preact';
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