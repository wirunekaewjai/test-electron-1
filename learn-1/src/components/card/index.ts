import { html } from 'htm/react';
import { Props } from './types';

import classes from './style';

export default function Card ({
  component = 'div',
  children,
}: Props)
{
  return html`
  <${component} className=${classes.card} >
    ${children}
  <//>
  `;
}