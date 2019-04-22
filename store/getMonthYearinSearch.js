import {AsyncStorage} from 'react-native';
import localStorage from 'react-native-sync-localstorage'
import moment from "moment";
export default{
    namespaced: true,
    state: {
        isShow: false,
        date: {
            month: moment(),
            year: moment(),
        }
    },
    getters: {
        getMonth: function (state) {
            return state.date.month;
        },
        getYear: function (state) {
            return state.date.year;
        },
        getSearch: function (state) {
            return state.isShow;
        }
    },
    mutations: {
        setMonth: function (state, payload) {
            state.date.month = payload;
        },
        setYear: function (state, payload) {
            state.date.year = payload;
        },
        setSearch: function(state, payload){
            state.isShow = payload;
        }
    },
    actions: {
        setMonth: function ({commit}, payload) {
            commit("setMonth", payload);
        },
        setYear: function ({commit}, payload) {
            commit("setYear", payload);
        },
        setSearch: function ({commit}, payload) {
            commit("setSearch", payload);
        }
    }
}