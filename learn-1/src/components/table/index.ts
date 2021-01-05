import { html } from 'htm/preact';
import { Props } from './types';

import classes from './style';

export default function Table ({
  children,
}: Props)
{
  return html`
  <table class=${classes.table} >
    ${children}
  </table>
  `;
}