import {AsyncStorage} from 'react-native';
import localStorage from 'react-native-sync-localstorage'
export default{
    namespaced: true,
    state: {
        percent: 0,
        timeEstimated: 60,
    },
    getters: {
        getPercent: function (state) {
            return state.percent
        },
        timeEstimated: function (state) {
            return state.timeEstimated;
        }
    },
    mutations: {
        setPercent: function (state, payload) {
            state.percent = payload;
        },

    },
    actions: {
        setPercent: function ({commit}, payload) {
            commit("setPercent", payload);
        }
    }
}