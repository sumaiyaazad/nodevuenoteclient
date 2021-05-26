import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import axios from 'axios'
import VueAxios from 'vue-axios'
import {store} from "./store";

// axios.defaults.baseURL='https://mt-notebook.herokuapp.com/';
// axios.defaults.baseURL='http://192.168.99.100:4000';
axios.defaults.baseURL='http://notebook-backend:4000';
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

export const eventBus=new Vue({
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
