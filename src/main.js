import Vue from "vue";
import App from "./App.vue";

import "./plugins/element.js";
import router from "./router";

import http from "./http.js";
Vue.prototype.$http = http;

import Toasted from "vue-toasted";
Vue.use(Toasted);

import vchart from "v-charts";
Vue.use(vchart);

import "./plugins/vant.js";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
