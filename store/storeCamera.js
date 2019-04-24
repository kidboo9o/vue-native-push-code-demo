import {AsyncStorage} from 'react-native';
import localStorage from 'react-native-sync-localstorage'
import moment from "moment";
export default{
    namespaced: true,
    state: {
       isShow: false,
    },
    getters: {
        getShow: function(state){
            return state.isShow;
        }
    },
    mutations: {
        setShow: function(state, payload){
            if(typeof payload === "boolean"){
                state.isShow = payload;
            }
        }
    },
    actions: {
        setShow: function({commit}, payload){
            commit("setShow", payload);
        }
    }


}