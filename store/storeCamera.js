import {AsyncStorage} from 'react-native';
import localStorage from 'react-native-sync-localstorage'
import moment from "moment";
export default{
    namespaced: true,
    state: {
        isShow: false,
        listImage: [],
        index: 0,
    },
    getters: {
        getShow: function (state) {
            return state.isShow;
        },
        getListImage: function(state){
            return state.listImage;
        }
    },
    mutations: {
        setShow: function (state, payload) {
            if (typeof payload === "boolean") {
                state.isShow = payload;
            }
        },
        setAddImage: function(state, payload){
            if(typeof payload === "object" && !Array.isArray(payload)){
                payload["id"] = state.index;
                state.index++;
                state.listImage.push(payload);
            }
        },
        setRemoveImage: function(state, payload){
            console.log("in ra loai payload : "+payload);
            if(typeof payload === "number" && payload >= 0){
                let found;
                for(let i=0, size=state.listImage.length ; i<size; i++){
                    if(state.listImage[i].id === payload){
                        found = i;
                        break;
                    }
                }
                state.listImage.splice(found, 1);
            }
        }
    },
    actions: {
        setShow: function ({commit}, payload) {
            commit("setShow", payload);
        },
        setAddImage: function({commit}, payload){
            commit("setAddImage", payload);
        },
        setRemoveImage: function({commit}, payload){
            commit("setRemoveImage", payload);
        }
    }


}