import { html } from 'htm/react';
import { Props } from './types';

import clsx from 'src/utils/clsx';
import classes from './style';

export default function Table ({
  children,
  sticky,
}: Props)
{
  return html`
  <table
    className=${clsx(classes.table, {
      [classes.sticky]: sticky,
    })}
  >
    ${children}
  </table>
  `;
}