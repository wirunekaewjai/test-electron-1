import 'module-alias/register';
import 'source-map-support/register';

import amplify from './amplify';
import router from './router';

window.addEventListener('DOMContentLoaded', async () =>
{
  amplify();
  await router();
});