import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL='https://floating-fortress-20098.herokuapp.com';

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

export const eventBus=new Vue({

});

new Vue({
  el: '#app',
  render: h => h(App)
})
