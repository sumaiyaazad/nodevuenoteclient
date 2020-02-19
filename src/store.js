import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export const store = new Vuex.Store({

  state: {
    loadingFlag: false,
  },

  getters: {
    getLoadingFlag: state =>{
      return state.loadingFlag
    },
  },

  mutations: {
    setLoadingTrue (state) {
      state.loadingFlag=true;
    },
    setLoadingFalse(state){
      state.loadingFlag=false;
    },

  }
});
