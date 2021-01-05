import { html } from 'htm/preact';
import { Props } from './types';

import clsx from 'src/utils/clsx';
import classes from './style';

export default function TableRow ({
  children,
  hover = false,
}: Props)
{
  return html`
  <tr 
    class=${clsx({
      [classes['hover']]: hover,
    })}
  >
    ${children}
  </tr>
  `;
}