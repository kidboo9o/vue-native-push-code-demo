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
            return state.user.data[0].username;
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
        },
        removeUser: function(state){
            state.isLogin = false;
            state.user = {};
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