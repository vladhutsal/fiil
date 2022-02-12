import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import store from "./store";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

import { createPinia, PiniaVuePlugin } from 'pinia';
import VueCompositionAPI from '@vue/composition-api';

Vue.config.productionTip = false;

Vue.use(VueCompositionAPI);
Vue.use(PiniaVuePlugin);
const pinia = createPinia();

new Vue({
  router,
  pinia,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
