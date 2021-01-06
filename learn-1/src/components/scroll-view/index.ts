import { html } from 'htm/react';
import { Props } from './types';

import classes from './style';

export default function ScrollView ({
  component = 'div',
  children,

  height = '100%',
}: Props)
{
  return html`
  <${component}
    className=${classes.scrollview}
    style=${{ height }}
  >
    ${children}
  <//>
  `;
}