import { ipcRenderer } from 'electron';
import { html, render } from 'htm/preact';

import PageEntries from 'src/pages/entries';
import PageEntry from 'src/pages/entry';

function renderRoute (Component: any, props?: any)
{
  render(html`<${Component} ...${props} />`, document.body);
}

window.addEventListener('DOMContentLoaded', () =>
{
  renderRoute(PageEntries);

  ipcRenderer.on('navigate', (_, page: string, props?: any) => {
    if (page === 'entries')
    {
      renderRoute(PageEntries, props);
    }
    else if (page === 'entry')
    {
      renderRoute(PageEntry, props);
    }
  });
});