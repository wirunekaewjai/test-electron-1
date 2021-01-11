import Vue from 'vue';
import vuetify from './plugins/vuetify';
import store from './store';
import router from './router';

import App from './app.vue';

Vue.config.productionTip = false;

const app = new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
});

app.$mount('#app');
