import {AsyncStorage} from 'react-native';
import localStorage from 'react-native-sync-localstorage'
import LibCustom from '../library/custom';
export default{
    namespaced: true,
    state: {
       screen:{
           components: {
               listinforuser: {
                   status: false,
                   typeShow: 'full', // have 2 type ( full, brief )
               },
               feedback: {
                   status: false,
               },
               applicationinformation: {
                   status: false,
               }
           }
       }
    },
    getters: {
        getScreen: function (state) {
            return state.screen;
        },
        getTypeListInforUser: function(state){
            return state.screen.components.listinforuser.typeShow;
        }
    },
    mutations: {
        onlyEnableComponent_TemplateIconFooter: function(state, payload){
            let arrKey = Object.keys(state.screen.components);
            if (typeof payload === "string") {
                let disableKey = arrKey.filter( value => value !== payload);
                arrKey.includes(payload) === true ? state.screen.components[payload].status = true : '';
                for (let i = 0, size = disableKey.length; i < size; i++) {
                    if(disableKey[i] !== "header"){
                        state.screen.components[disableKey[i]].status = false;
                    }

                }
            } else if (typeof payload === "object" && Array.isArray(payload)) {
                let temp;
                for (let i = 0, size = payload.length; i < size; i++) {
                    arrKey.includes(payload[i]) === true ? state.screen.components[payload[i]].status = true : '';
                }
                let disableKey = LibCustom.arr_diff(arrKey, payload);
                for (let i = 0, size = disableKey.length; i < size; i++) {
                    if(disableKey[i] !== "header"){
                        state.screen.components[disableKey[i]].status = false;
                    }
                }
            } else {
                alert("tham số truyền vào nên là chuỗi hoặc mảng");
            }
        },
        setTypeShowListInforUser: function(state, payload){
            if(typeof payload === "string" && payload !== ""){
                state.screen.components.listinforuser.typeShow = payload;
            }else{
                console.log("gia tri ban nhap vao khong hop le");
            }
        }

    },
    actions: {
        onlyEnableComponent_TemplateIconFooter: function({commit}, payload){
            commit("onlyEnableComponent_TemplateIconFooter", payload);
        },
        setTypeShowListInforUser: function({commit}, payload){
            commit("setTypeShowListInforUser", payload);
        }
    }
}