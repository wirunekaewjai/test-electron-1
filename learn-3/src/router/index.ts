import Vue from 'vue';
import VueRouter from 'vue-router';

import ViewHome from '@/views/home/template.vue';

import ViewAuthSignIn from '@/views/auth-sign-in/template.vue';
import ViewAuthSignUp from '@/views/auth-sign-up/template.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: ViewHome,
  },

  {
    path: '/sign-in',
    name: 'auth-sign-in',
    component: ViewAuthSignIn,
  },

  {
    path: '/sign-up',
    name: 'auth-sign-up',
    component: ViewAuthSignUp,
  },
];

const router = new VueRouter({
  routes
});

export default router;