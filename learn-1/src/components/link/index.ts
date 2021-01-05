import { ipcRenderer } from 'electron';
import { html } from 'htm/preact';
import { Props } from './types';

export default function Link ({
  page,
  props,
  children,
}: Props)
{
  function onClick (ev: MouseEvent)
  {
    ev.preventDefault();

    ipcRenderer.send('navigate', page, props);
  }

  return html`
  <button
    onclick="${onClick}"
  >
    ${children}
  </button>
  `;
}