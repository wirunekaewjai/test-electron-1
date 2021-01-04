import 'module-alias/register';
import 'source-map-support/register';

import { html, render } from 'htm/preact';

import PageHome from 'src/pages/home';
import PageContact from 'src/pages/contact';
import PageAbout from 'src/pages/about';

const routes = [
  {
    path: '/',
    component: PageHome,
  },
  {
    path: '/contact',
    component: PageContact,
  },
  {
    path: '/about',
    component: PageAbout,
  },
];

window.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  render(html`<${routes[0].component} />`, body);

  body.addEventListener('click', (ev) => {
    const target = ev.target as HTMLElement;
  
    if (target?.tagName.toUpperCase() === 'A')
    {
      const el = target as HTMLAnchorElement;
      const href = el.getAttribute('href').split('?')[0];

      const route = routes.find(r => r.path === href);

      if (route)
      {
        ev.preventDefault();
  
        render(html`<${route.component} />`, body);
      }
      else if (href.startsWith('/'))
      {
        render(html`<${routes[0].component} />`, body);
      }
    }
  });
});