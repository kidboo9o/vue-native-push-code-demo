import {AsyncStorage} from 'react-native';
import localStorage from 'react-native-sync-localstorage'
import LibCustom from '../library/custom';
const valueDefault = {
    name: 'Home',
    container: {
      scroll: {
          status: true,
      },
      style: {
          backgroundColor: 'transparent'
      }

    },
    components: {
        header: {
            text: {
                title: 'Venus DVKH',
            },
            route: 'menu',
            icon: {
                name: 'menu',
                type: ''
            }
        },
        navbar: {
            status: true,
            bgNavbar: {
                image: {
                    src: ''
                }
            },
            data: {
                style: {
                    height: LibCustom.viewScreen(35, 'vh')
                },
                row: [
                    {
                        id: 0,
                        style: {
                            paddingTop: LibCustom.viewScreen(3, 'vw'),
                            paddingBottom: LibCustom.viewScreen(3, 'vw')
                        },
                        data: [
                            {

                                id: 0,
                                style: {
                                    marginLeft: LibCustom.viewScreen(3, 'vw'),
                                    marginRight: LibCustom.viewScreen(3, 'vw'),
                                },
                                classObject: {
                                    'col-4': true,
                                },
                                data: {
                                    svg: {
                                        src: require('../assets/images/thongtinbanquanly.svg'),
                                        width: LibCustom.viewScreen(50, 'vw'),
                                        height: LibCustom.viewScreen(6, 'vh'),
                                        fill: '#3868D9'
                                    },
                                    text: {
                                        style: {
                                            fontSize: LibCustom.scaleFontSize(12)
                                        },
                                        title: "Thông báo"

                                    }
                                }

                            },
                            {

                                id: 1,
                                style: {
                                    marginRight: LibCustom.viewScreen(3, 'vw'),
                                },
                                classObject: {
                                    'col-4': true,
                                },
                                data: {
                                    svg: {
                                        src: require('../assets/images/hoadondiennuoc.svg'),
                                        width: LibCustom.viewScreen(45, 'vw'),
                                        height: LibCustom.viewScreen(6, 'vh'),
                                        fill: '#43A047'
                                    },
                                    text: {
                                        style: {
                                            fontSize: LibCustom.scaleFontSize(12)
                                        },
                                        title: "Phí dịch vụ"

                                    }
                                }

                            },
                            {

                                id: 2,
                                style: {
                                    marginRight: LibCustom.viewScreen(3, 'vw'),
                                    paddingTop: LibCustom.viewScreen(2, 'vh')
                                },
                                classObject: {
                                    'col-4': true,
                                },
                                data: {
                                    svg: {
                                        src: require('../assets/images/thong-tin-kh.svg'),
                                        width: LibCustom.viewScreen(45, 'vw'),
                                        height: LibCustom.viewScreen(6, 'vh'),
                                        fill: '#F57C00'
                                    },
                                    text: {
                                        style: {
                                            fontSize: LibCustom.scaleFontSize(12)
                                        },
                                        title: "Thông tin khách hàng"

                                    }
                                }

                            }
                        ]
                    },

                    {
                        id: 1,
                        style: {
                            paddingBottom: LibCustom.viewScreen(3, 'vw')
                        },
                        data: [
                            {

                                id: 0,
                                style: {
                                    marginLeft: LibCustom.viewScreen(3, 'vw'),
                                    marginRight: LibCustom.viewScreen(3, 'vw'),
                                },
                                classObject: {
                                    'col-4': true,
                                },
                                data: {
                                    svg: {
                                        src: require('../assets/images/phananhgopy.svg'),
                                        width: LibCustom.viewScreen(45, 'vw'),
                                        height: LibCustom.viewScreen(6, 'vh'),
                                        fill: '#C72929'
                                    },
                                    text: {
                                        style: {
                                            fontSize: LibCustom.scaleFontSize(12)
                                        },
                                        title: "Góp ý"

                                    }
                                }

                            },
                            {

                                id: 1,
                                style: {
                                    marginRight: LibCustom.viewScreen(3, 'vw'),
                                },
                                classObject: {
                                    'col-4': true,
                                },
                                data: {
                                    svg: {
                                        src: require('../assets/images/dangkidichvu.svg'),
                                        width: LibCustom.viewScreen(45, 'vw'),
                                        height: LibCustom.viewScreen(6, 'vh'),
                                        fill: '#512DA8'
                                    },
                                    text: {
                                        style: {
                                            fontSize: LibCustom.scaleFontSize(12)
                                        },
                                        title: "Đăng kí dịch vụ"

                                    }
                                }

                            },
                            {

                                id: 2,
                                style: {
                                    marginRight: LibCustom.viewScreen(3, 'vw'),
                                    paddingTop: LibCustom.viewScreen(2.5, 'vh')
                                },
                                classObject: {
                                    'col-4': true,
                                },
                                data: {
                                    svg: {
                                        src: require('../assets/images/thong-bao-phi-dich-vu.svg'),
                                        width: LibCustom.viewScreen(45, 'vw'),
                                        height: LibCustom.viewScreen(5, 'vh'),
                                        fill: '#E69B22'
                                    },
                                    text: {
                                        style: {
                                            fontSize: LibCustom.scaleFontSize(12),
                                            paddingTop: LibCustom.viewScreen(1, 'vh')
                                        },
                                        title: "Thông báo phí dịch vụ"

                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        },
        carousel: {
            status: true,
        },
        content: {
            status: true,
            data: [
                {
                    id: 0,
                    editable: false,
                    allowEditable: false,
                    image: {
                        src: require('../assets/images/img-01.jpg'),
                        width: 0,
                        height: 0,
                        scale: 0,
                    },
                    data: {
                        title: 'Cty venus ',
                        description: "Venus và Quốc tế thiếu nhi 01/6/2018\n\nGóp chung niềm vui cùng các cháu tại các Tòa nhà chung cư do Venus quản lý trong dịp Lễ Quốc tế thiếu nhi năm 2018, Venus Corp sẽ tổ chức chương trình quà tặng đặc biệt vui nhộn và ấm áp với chú hề thông minh, dí dỏm và rất nhiều bánh quà cho các con thêm phấn khởi.\n\nVenus rất mong các bậc cha mẹ đang cư trú tại các Khu chung cư phối hợp tạo điều kiện cho các bé được tham gia chương trình vào lúc 17h30 ngày Thứ Sáu 01/6/2018 tại sảnh chung của các tòa nhà.\n\nRất cám ơn quý vị phụ huynh đã đồng hành cùng Venus. Chúc gia đình ngày càng vui vẻ và hạnh phúc.\n\nHẹn gặp lại các bé nha.",
                        time: '30 minutes'
                    }
                },
                {
                    id: 1,
                    editable: false,
                    allowEditable: false,
                    image: {
                        src: require('../assets/images/img-02.jpg'),
                        width: 0,
                        height: 0,
                        scale: 0,
                    },
                    data: {
                        title: 'Cty venus',
                        description: 'Cty venus',
                        time: '30 minutes'
                    }
                },
                {
                    id: 2,
                    editable: false,
                    allowEditable: false,
                    image: {
                        src: require('../assets/images/img-03.jpg'),
                        width: 0,
                        height: 0,
                    },
                    data: {
                        title: 'Cty venus',
                        description: 'Cty venus',
                        time: '30 minutes'
                    }
                },
                {
                    id: 3,
                    editable: false,
                    allowEditable: false,
                    image: {
                        src: require('../assets/images/background-login.jpeg'),
                        width: 0,
                        height: 0,
                    },
                    data: {
                        title: 'Cty venus',
                        description: 'Cty venus',
                        time: '30 minutes'
                    }
                },
                {
                    id: 4,
                    editable: false,
                    allowEditable: false,
                    image: {
                        src: require('../assets/images/side-bar.jpg'),
                        width: 0,
                        height: 0,
                    },
                    data: {
                        title: 'Cty venus',
                        description: 'Cty venus',
                        time: '30 minutes'
                    }
                }
            ]
        },
        templatehandleiconfooter: {
            status: false,
        },
    }
};
export default{
    namespaced: true,
    state: {
        screen: valueDefault,
        listScreenSaved: [],
    },
    getters: {
        getScreenCurrent: function (state) {
            return state.screen;
        },
        getNameScreenCurrent: function(state){
          return state.screen.name;
        },
        getNavbar: function (state) {
            return state.screen.components.navbar;
        },
        getHeader: function (state) {
            return state.screen.components.header;
        },
        getListScreenSaved: function (state) {
            return state.listScreenSaved;
        },
        getContent: function(state){
            return state.screen.components.content;
        },

    },
    mutations: {
        setName: function (state, payload) {
            if (typeof payload === "string") {
                state.screen.name = payload;
            }
        },
        setScreen: function (state, payload) {
            if (typeof payload === "string" && payload !== "") {
                return new Promise((resolve, reject) => {
                    AsyncStorage.getItem(payload).then((value) => {
                        if (value) {
                            state.screen = Object.assign(JSON.parse(value));
                        }
                    });
                });
            } else {
                alert("screen ban nhap vao khong hop le");
            }
        },
        saveScreen: function (state, payload) {
            if (typeof payload === "string" && payload !== "") {
                if (state.listScreenSaved.indexOf(payload) === -1) {
                    state.listScreenSaved.push(payload);
                    localStorage.setItem(payload, state.screen);
                }
            }
        },
        disableComponent: function (state, payload) {
            let arrKey = Object.keys(state.screen.components);
            if (typeof payload === "string") {
                arrKey.includes(payload) === true ? state.screen.components[payload].status = false : '';
            } else if (typeof payload === "object" && Array.isArray(payload)) {
                let temp;
                for (let i = 0, size = payload.length; i < size; i++) {
                    arrKey.includes(payload[i]) === true ? state.screen.components[payload[i]].status = false : '';
                }
            } else {
                alert("tham số truyền vào nên là chuỗi hoặc mảng");
            }
        },
        enableComponent: function (state, payload) {
            let arrKey = Object.keys(state.screen.components);
            if (typeof payload === "string") {
                arrKey.includes(payload) === true ? state.screen.components[payload].status = true : '';
            } else if (typeof payload === "object" && Array.isArray(payload)) {
                let temp;
                for (let i = 0, size = payload.length; i < size; i++) {
                    arrKey.includes(payload[i]) === true ? state.screen.components[payload[i]].status = true : '';
                }
            } else {
                alert("tham số truyền vào nên là chuỗi hoặc mảng");
            }
        },
        onlyEnableComponent: function(state, payload){
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
        setTitleHeader: function (state, payload) {
            if (typeof payload === "string") {
                state.screen.components.header.text.title = payload;
            }
        },
        setIconHeader: function (state, payload) {
            if (typeof payload === "object") {
                if (typeof payload.type && payload.type !== "") {
                    state.screen.components.header.icon.type = payload.type;
                }
                if (typeof payload.name && payload.name !== "") {
                    state.screen.components.header.icon.name = payload.name;
                }
            }
        },
        setRouteHeader: function (state, payload) {
            if (typeof payload === "string") {
                state.screen.components.header.route = payload;
            }
        },
        setRowDataNavbar: function (state, payload) {
            if (typeof payload === "object" && Array.isArray(payload)) {
                state.screen.components.navbar.data.row = payload;
            }
        },
        setStyleNavbar: function (state, payload) {
            if (typeof payload === "object" && !Array.isArray(payload)) {
                state.screen.components.navbar.data.style = payload;
            }
        },
        setDataContent: function(state,payload){
            if(typeof payload === "object" && Array.isArray(payload)){
                state.screen.components.content.data = payload;
            }
        },
        setBackgroundNavbar: function(state, payload){
            if(typeof payload === "object" && !Array.isArray(payload)){
                state.screen.components.navbar.bgNavbar = payload;
            }
        },
        setScrollContainer: function(state, payload){
            state.screen.container.scroll.status = payload;
        },
        setStyleContainer: function(state, payload){
            if(typeof payload === "object" && !Array.isArray(payload)){
                state.screen.container.style = payload;
            }else{
                console.log("du lieu truyen vao khong hop le");
            }
        }

    },
    actions: {
        setName: function ({commit}, payload) {
            commit("setName", payload);
        },
        setScreen: function ({commit}, payload) {
            commit("setScreen", payload);
        },
        saveScreen: function ({commit}, payload) {
            commit("saveScreen", payload);
        },
        disableComponent: function ({commit}, payload) {
            commit("disableComponent", payload);
        },
        enableComponent: function ({commit}, payload) {
            commit("enableComponent", payload,);
        },
        setTitleHeader: function ({commit}, payload) {
            commit("setTitleHeader", payload);
        },
        setIconHeader: function ({commit}, payload) {
            commit("setIconHeader", payload);
        },
        setRouteHeader: function ({commit}, payload) {
            commit("setRouteHeader", payload);
        },
        setRowDataNavbar: function ({commit}, payload) {
            commit("setRowDataNavbar", payload);
        },
        setStyleNavbar: function ({commit}, payload) {
            commit("setStyleNavbar", payload);
        },
        setDataContent: function({commit}, payload){
            commit("setDataContent", payload);
        },
        setBackgroundNavbar: function({commit}, payload){
            commit("setBackgroundNavbar", payload);
        },

        setScrollContainer: function({commit}, payload){
          commit("setScrollContainer", payload);
        },
        onlyEnableComponent: function({commit}, payload){
            commit("onlyEnableComponent", payload);
        },
        setStyleContainer: function({commit}, payload){
            commit("setStyleContainer", payload);
        }
    }
}