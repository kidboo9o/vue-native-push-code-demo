import {AsyncStorage} from 'react-native';
import localStorage from 'react-native-sync-localstorage'
import localDeviceStorage from "../library/localStorage";
const localFile = "user";
export default{
    namespaced: true,
    state: {
        isLogin: false,
        user: {},
        index: 0,
    },
    getters: {
        checkLogin: function (state) {
            return state.isLogin;
        },
        getUserName: function(state){
            let user = localStorage.getItem(localFile);
            if(user.data.length > 0){
                if(typeof user.data[0].username){
                    return user.data[0].username;
                }
            }
        },
        getUser: function(state){
            return state.user;
        },
        getIndexSelected: function(state){
            return state.user.data[state.index];
        }
    },
    mutations: {
        saveInforUser: function(state, payload){
            state.isLogin = true;
            state.user = payload;
            localDeviceStorage.checkFileOrDirectoryExists(localFile).then((value) => {
                if(value.exists === false){
                    localDeviceStorage.writeFile(localFile, payload);
                }
            })
            return localStorage.setItem(localFile, payload);
        },
        removeUser: function(state){
            state.isLogin = false;
            state.user = {};
            localDeviceStorage.checkFileOrDirectoryExists(localFile).then((value) => {
                if(value.exists === true && value.isDirectory === false){
                    localDeviceStorage.removeFile(localFile);
                }
            })
            return localStorage.removeItem(localFile);
        },
        setIndex: function(state, payload){
            if(typeof payload === "number" && payload >= 0){
                state.index = payload;
            }else{
                console.log("du lieu truyen vao khong hop le");
            }
        }

    },
    actions: {
        saveInforUser: function({commit}, payload){
            commit("saveInforUser", payload);
        },
        removeUser: function({commit}){
            commit("removeUser");
        },
        setIndex: function({commit}, payload){
            commit("setIndex", payload);
        }

    }
}