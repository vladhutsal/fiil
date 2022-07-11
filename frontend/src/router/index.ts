import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import TheHome from '../views/TheMain.vue';
import TheAuth from '@/views/TheAuth.vue';
import TheChat from '@/views/TheChat.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'TheHome',
    component: TheHome,
  },
  {
    path: '/chat',
    name: 'Chat',
    component: TheChat,
  },
  {
    path: '/login',
    component: TheAuth,
    props: { currentAuthTab: 'login' },
  },
  {
    path: '/register',
    component: TheAuth,
    props: { currentAuthTab: 'create user' },
  },
  { path: '*', redirect: '/' }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
