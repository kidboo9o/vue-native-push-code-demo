import {AsyncStorage} from 'react-native';
import localStorage from 'react-native-sync-localstorage'
import moment from "moment";
export default{
    namespaced: true,
    state: {
        isShowDate: false,
        isShowDateTime: false,
        date: '',
        time: '',
    },
    getters: {
        getShowDate: function (state) {
            return state.isShowDate;
        },
        getShowDateTime: function(state){
          return state.isShowDateTime;
        },
        getDate: function (state) {
            return state.date;
        },
        getTime: function(state){
            return state.time;
        },

    },
    mutations: {
        setShowDate: function (state, payload) {
            state.isShowDate = payload;
        },
        setDate: function (state, payload) {
            state.date = payload;
        },
        setTime: function(state, payload){
            state.time = payload;
        },
        setShowDateTime: function(state, payload){
            state.isShowDateTime = payload;
        }
    },
    actions: {
        setShowDate: function ({commit}, payload) {
            commit("setShowDate", payload);
        },
        setShowDateTime: function({commit}, payload){
           commit("setShowDateTime", payload);
        },
        setDate: function ({commit}, payload) {
            commit("setDate", payload);
        },
        setTime: function({commit}, payload){
            commit("setTime", payload);
        }
    }


}