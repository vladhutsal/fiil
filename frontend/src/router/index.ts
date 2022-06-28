import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import TheHome from "../views/TheHome.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "TheHome",
    component: TheHome,
  },
  {
    path: "/chat",
    name: "Chat",
    component: () =>
      import(/* webpackChunkName: "chat" */ "../views/TheChat.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
