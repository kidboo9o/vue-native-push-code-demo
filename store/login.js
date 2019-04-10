import {AsyncStorage} from 'react-native';
import localStorage from 'react-native-sync-localstorage'
export default{
    namespaced: true,
    state: {
        isLogin: false,
        user: {},
    },
    getters: {
        checkLogin: function (state) {
            return state.isLogin;
        },
        getUserName: function(state){
            let user = localStorage.getItem("user");
            if(user.data.length > 0){
                if(typeof user.data[0].username){
                    return user.data[0].username;
                }
            }
        },
        getUser: function(state){
            return state.user;
        }
    },
    mutations: {
        saveInforUser: function(state, payload){
            state.isLogin = true;
            state.user = payload;
            return localStorage.setItem("user", payload);
        },
        removeUser: function(state){
            state.isLogin = false;
            state.user = {};
            return localStorage.removeItem("user");
        }

    },
    actions: {
        saveInforUser: function({commit}, payload){
            commit("saveInforUser", payload);
        },
        removeUser: function({commit}){
            commit("removeUser");
        }
    }
}