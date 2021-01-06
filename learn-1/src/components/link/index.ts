import { ipcRenderer } from 'electron';
import { html } from 'htm/preact';
import { Props } from './types';

import classes from './style';

export default function Link ({
  page,
  props,
  children,

  ...rests
}: Props)
{
  function onClick (ev: MouseEvent)
  {
    ev.preventDefault();

    ipcRenderer.send('navigate', page, props);
  }

  return html`
  <button
    className=${classes.link}
    onclick=${onClick}
    
    ...${rests}
  >
    ${children}
  </button>
  `;
}