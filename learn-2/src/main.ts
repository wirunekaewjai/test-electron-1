import Vue from 'vue';
import App from './app/index.vue';

Vue.config.productionTip = false

new Vue({
  render: h => h(App, {
    props: {
      page: 'entries'
    },
  }),
}).$mount('#app');

window.ipcRenderer.on('navigate', (_, page: string, props: any) => {
  new Vue({
    render: h => h(App, {
      props: {
        page,
        props,
      },
    }),
  }).$mount('#app');
});