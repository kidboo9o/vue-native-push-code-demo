import {AsyncStorage} from 'react-native';
import localStorage from 'react-native-sync-localstorage'
import moment from "moment";
export default{
    namespaced: true,
    state: {
        isShow: false,
        listImage: [],
        index: 0,
        listImageStartByIndexSelected: [],
    },
    getters: {
        getShow: function (state) {
            return state.isShow;
        },
        getListImage: function(state){
            return state.listImage;
        },
        getShowListImageStartByIndexSelected: function(state){
            return state.listImageStartByIndexSelected;
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
            if(typeof payload === "number" && payload >= 0){
                let found;
                let found2;
                for(let i=0, size=state.listImage.length ; i<size; i++){
                    if(state.listImage[i].id === payload){
                        found = i;
                        break;
                    }
                }
                for(let i=0, size=state.listImageStartByIndexSelected.length ; i<size; i++){
                    if(state.listImageStartByIndexSelected[i].id === payload){
                        found2 = i;
                        break;
                    }
                }
                state.listImage.splice(found, 1);
                state.listImageStartByIndexSelected.splice(found2, 1);
            }
        },
        setShowListImageStartByIndexSelected: function(state, payload){
            if(typeof payload === "number" && payload >= 0) {
                let found;
                let arrList = [];
                let size = state.listImage.length;
                for(let i=0; i<size; i++){
                    if(state.listImage[i].id === payload){
                        found = i;
                        break;
                    }
                }
                if (found > 0 && found < size - 1) {
                    for(let k=found; k < size ; k++){
                        arrList.push(state.listImage[k]);
                    }
                    for(let m=found-1; m>=0; m--){
                        arrList.push(state.listImage[m]);
                    }
                } else if (found === size - 1) {
                    for(let n=size-1; n >= 0 ; n--){
                        arrList.push(state.listImage[n]);
                    }
                } else{
                    arrList = state.listImage.slice();
                }
                state.listImageStartByIndexSelected = arrList.slice();
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
        },
        setShowListImageStartByIndexSelected: function({commit}, payload){
            commit("setShowListImageStartByIndexSelected", payload);
        }
    }


}