import Vue from 'vue';
import Vuex, { createLogger } from 'vuex';
// import Store from 'electron-store';

import auth from './modules/auth';
import snackbar from './modules/snackbar';

Vue.use(Vuex);

// const store = new Store();

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    status: 'none',
    // authentication: false,
    // datastore: false,
  },
  mutations: {
    setStatus (state, status: string) {
      state.status = status;
    },
    // setReady (state, type: 'authentication' | 'datastore') {
    //   state[type] = true;
    // },
  },
  modules: {
    auth,
    snackbar,
  },
  plugins: [
    createLogger(),
  ],
});