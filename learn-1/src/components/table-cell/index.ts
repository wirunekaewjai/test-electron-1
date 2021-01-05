import { html } from 'htm/preact';
import { Props } from './types';

import clsx from 'src/utils/clsx';
import classes from './style';

export default function TableCell ({
  component = 'td',
  children,

  align = 'left',
  padding = 'default',

  ...props
}: Props)
{
  return html`
  <${component} 
    ...${props}
    class=${clsx({
      [classes['align-left']]: align === 'left',
      [classes['align-right']]: align === 'right',
      [classes['padding-none']]: padding === 'none',
      [classes['padding-default']]: padding === 'default',
      [classes['padding-dense']]: padding === 'dense',
    })}
  >
    ${children}
  <//>
  `;
}