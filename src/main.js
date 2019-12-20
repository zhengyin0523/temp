import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { utils } from './common/utils/utils';
// Vue自定义指令
import TLDs from "./common/fastRegister/directives";

window.l = utils.l;
Vue.use(TLDs);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')