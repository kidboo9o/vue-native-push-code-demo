import Vue from "vue-native-core";
import Vuex from 'vuex'
Vue.use(Vuex);

export const store = new Vuex.Store({
    strict: false,
    namespaced: true,
    state: {
        user: 'au dep trai',
    },
    getters: {
        getUser(state){
            return state.user;
        }
    },
    mutations: {
        setUser(state, payload){
            state.user = payload;
        }
    },
    actions: {
      setUser({commit}, payload){
          commit('setUser', payload);
      }
    },

});