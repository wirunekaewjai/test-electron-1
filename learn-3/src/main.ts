import Vue from 'vue';

import { sync } from 'vuex-router-sync';

import vuetify from './plugins/vuetify';
import store from './store';
import router from './router';

import App from './app.vue';

Vue.config.productionTip = false;

const unsync = sync(store, router);
const app = new Vue({
  vuetify,
  store,
  router,
  
  destroyed () {
    unsync?.();
  },

  render: h => h(App)
});

app.$mount('#app');
