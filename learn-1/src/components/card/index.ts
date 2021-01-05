import { html } from 'htm/preact';
import { Props } from './types';

import classes from './style';

export default function Card ({
  component = 'div',
  children,
}: Props)
{
  return html`
  <${component} class=${classes.card} >
    ${children}
  <//>
  `;
}