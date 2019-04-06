import {AsyncStorage} from 'react-native';
import localStorage from 'react-native-sync-localstorage'
import LibCustom from '../library/custom';
const valueDefault = {
    name: 'Home',
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
            data: {
                style: {
                    height: LibCustom.viewScreen(30, 'vh')
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
                                },
                                classObject: {
                                    'col-4': true,
                                },
                                data: {
                                    svg: {
                                        src: require('../assets/images/hoadondiennuoc.svg'),
                                        width: LibCustom.viewScreen(45, 'vw'),
                                        height: LibCustom.viewScreen(6, 'vh'),
                                    },
                                    text: {
                                        style: {
                                            fontSize: LibCustom.scaleFontSize(12)
                                        },
                                        title: "Phí dịch vụ"

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
                                },
                                classObject: {
                                    'col-4': true,
                                },
                                data: {
                                    svg: {
                                        src: require('../assets/images/dangkidichvu.svg'),
                                        width: LibCustom.viewScreen(45, 'vw'),
                                        height: LibCustom.viewScreen(6, 'vh'),
                                    },
                                    text: {
                                        style: {
                                            fontSize: LibCustom.scaleFontSize(12)
                                        },
                                        title: "Đăng kí dịch vụ"

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
        }
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
        getNavbar: function (state) {
            return state.screen.components.navbar.data;
        },
        getHeader: function (state) {
            return state.screen.components.header;
        },
        getListScreenSaved: function (state) {
            return state.listScreenSaved;
        }


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
        }
    }
}