import Vue from 'vue';
import VueRouter from 'vue-router';

import ViewWallets from '@/views/wallets/template.vue';
import ViewWallet from '@/views/wallet/template.vue';
import ViewProfile from '@/views/profile/template.vue';

import ViewAuthSignIn from '@/views/auth-sign-in/template.vue';
import ViewAuthSignUp from '@/views/auth-sign-up/template.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'wallets',
    component: ViewWallets,
    alias: '/wallets',
  },

  {
    path: '/wallets/:walletID',
    name: 'wallet',
    component: ViewWallet,
  },

  {
    path: '/profile',
    name: 'profile',
    component: ViewProfile,
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
  routes,
});

export default router;