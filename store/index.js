import Vue from "vue-native-core";
import Vuex from 'vuex';
import timeProcess from "./timeProcess";
import login from "./login";
import screenBaseOnFooter from "./ScreenBaseOnFooter";
Vue.use(Vuex);

export const store = new Vuex.Store({
    namespaced: true,
    modules: {
        timeProcess,
        login,
    }
});