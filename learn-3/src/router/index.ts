import Vue from 'vue';
import VueRouter from 'vue-router';

import ViewHome from '@/views/home/template.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: ViewHome,
  },
];

const router = new VueRouter({
  routes
});

export default router;