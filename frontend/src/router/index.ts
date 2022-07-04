import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import TheHome from '../views/TheMain.vue';

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
    component: () =>
      import(/* webpackChunkName: 'chat' */ '../views/TheChat.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: 'login' */ '../views/TheAuth.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () =>
      import(/* webpackChunkName: 'register' */ '../views/TheAuth.vue'),
  },
  { path: '*', component: TheHome }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
