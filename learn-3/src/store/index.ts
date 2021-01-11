import Vue from 'vue';
import Vuex, { createLogger } from 'vuex';
// import Store from 'electron-store';

import snackbar from './modules/snackbar';

Vue.use(Vuex);

// const store = new Store();

export default new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  state: {
    ready: false,
  },
  mutations: {
    setReady (state) {
      state.ready = true;
    },
  },
  modules: {
    snackbar: snackbar(),
  },
  plugins: [
    createLogger(),
  ],
});