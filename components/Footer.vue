<template>
    <nb-footer :style="{height: viewScreen(11, 'vh')}">
        <nb-footer-tab class="footer">
            <view class="row">
                <touchable-opacity class="col-2" v-for="todo in itemsFooter" :key="todo.id"
                                   :on-press="() => handleClick(todo.id)">
                    <view>
                        <SvgUri
                                :source="todo.src"
                                :width="viewScreen(18, 'vw')"
                                :height="viewScreen(6, 'vh')"
                                :fill="todo.id === getScreenCurrent ? '#546EFF' : (todo.id === itemChecked ? '#546EFF' : '#212121')"
                        />
                        <nb-text class="text-center"
                                 :style="{
                                    fontSize: scaleFontSize(12),
                                    color: todo.id === getScreenCurrent ? '#546EFF' : (todo.id === itemChecked ? '#546EFF' : '#212121')
                                }"
                        >{{todo.title}}
                        </nb-text>
                    </view>
                </touchable-opacity>
            </view>
        </nb-footer-tab>
    </nb-footer>
</template>
<script>
    import LibCustom from '../library/custom';
    import SvgUri from 'react-native-svg-uri';
    import {mapGetters, mapActions} from 'vuex';
    import {AsyncStorage} from 'react-native';
    import localStorage from 'react-native-sync-localstorage'
    export default {
        props: {
            navigation: {
                type: Object
            }
        },
        components: {
            SvgUri,
        },
        data: function () {
            return {
                screen: {
                    width: 0,
                    height: 0,
                },
                itemChecked: 0,
                itemsFooter: [
                    {
                        id: 0,
                        src: require('../assets/images/trangchu.svg'),
                        title: 'Trang chủ',
                    },
                    {
                        id: 1,
                        src: require('../assets/images/thongbao.svg'),
                        title: 'Thông báo',
                    },
                    {
                        id: 2,
                        src: require('../assets/images/dichvu.svg'),
                        title: 'Dịch vụ',
                    },
                    {
                        id: 3,
                        src: require('../assets/images/tracuu.svg'),
                        title: 'Tra cứu',
                    },
                    {
                        id: 4,
                        src: require('../assets/images/caidat.svg'),
                        title: 'Cài đặt',
                    }
                ],
            };
        },
        created: function () {
        },
        computed: {
            isLogin: function () {
//                return function () {
//                    return true;
//                };
                return this.checkLogin;
            },
            listScreenSave: function () {
                return this.getListScreenSaved();
            },
            getScreenCurrent: function(){
                let temp = this.getNameScreenCurrent();
                let key;
                switch(temp){
                    case "Home": key = 0; break;
                    case "ThongBao": key = 1; break;
                    case "DichVu": key = 2; break;
                    case "TraCuu": key = 3; break;
                    case "CaiDat": key = 4; break;
                }
                this.itemChecked = key;
                return this.itemChecked;
            }
        },
        mounted: function () {
            this.screen = LibCustom.getSizeScreen();
        },
        methods: {
            ...mapGetters("login", ['checkLogin']),
            ...mapGetters("screenBaseOnFooter", ['getListScreenSaved','getNameScreenCurrent']),
            ...mapActions("screenBaseOnFooter",
                [
                    'setTitleHeader',
                    'setRowDataNavbar',
                    'setStyleNavbar',
                    'setIconHeader',
                    'setRouteHeader',
                    'setName',
                    'saveScreen',
                    'setScreen',
                    'setBackgroundNavbar',
                    'onlyEnableComponent',
                ]),
            scaleFontSize: function (size) {
                return LibCustom.scaleFontSize(size);
            },
            viewScreen: function (percent, type, minus = 0) {
                return LibCustom.viewScreen(percent, type, minus);
            },
            handleClick: function (key) {
                let rowData, styleNavbar, name;
                switch (key) {
                    case 0 :
                        this.setScreen("Home");
                        break;
                    case 1 :
                        name = "ThongBao";
                        if (this.isLogin()) {
                            if (this.listScreenSave.indexOf(name) !== -1) {
                                this.setScreen(name);
                            } else {
                                this.setName(name);
                                this.onlyEnableComponent('navbar');
                                this.setTitleHeader("Thông báo");
                                this.setIconHeader({name: 'menu'});
                                this.setRouteHeader("menu");
                                rowData = [
                                    {
                                        id: 0,
                                        style: {
                                            paddingTop: LibCustom.viewScreen(5, 'vw'),
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
                                                    'col-12': true,
                                                },
                                                data: {
                                                    svg: {
                                                        src: require('../assets/images/thong-bao-chung.svg'),
                                                        width: LibCustom.viewScreen(50, 'vw'),
                                                        height: LibCustom.viewScreen(6, 'vh'),
                                                        fill: "#0D47A1"
                                                    },
                                                    text: {
                                                        style: {
                                                            fontSize: LibCustom.scaleFontSize(12)
                                                        },
                                                        title: "Thông báo chung"

                                                    }
                                                }
                                            },
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
                                                    'col-6': true,
                                                },
                                                data: {
                                                    svg: {
                                                        src: require('../assets/images/thongtinbanquanly.svg'),
                                                        width: LibCustom.viewScreen(45, 'vw'),
                                                        height: LibCustom.viewScreen(6, 'vh'),
                                                        fill: "#3868D9"
                                                    },
                                                    text: {
                                                        style: {
                                                            fontSize: LibCustom.scaleFontSize(12)
                                                        },
                                                        title: "Thông báo từ ban quản lý"

                                                    }
                                                }

                                            },

                                            {

                                                id: 1,
                                                style: {
                                                    marginRight: LibCustom.viewScreen(3, 'vw'),
                                                },
                                                classObject: {
                                                    'col-6': true,
                                                },
                                                data: {
                                                    svg: {
                                                        src: require('../assets/images/thong-bao-phi-dich-vu.svg'),
                                                        width: LibCustom.viewScreen(45, 'vw'),
                                                        height: LibCustom.viewScreen(6, 'vh'),
                                                        fill: '#E69B22',
                                                    },
                                                    text: {
                                                        style: {
                                                            fontSize: LibCustom.scaleFontSize(12)
                                                        },
                                                        title: "Thông báo phí dịch vụ"

                                                    }
                                                }

                                            },
                                        ]
                                    },
                                    {
                                        id: 2,
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
                                                    'col-6': true,
                                                },
                                                data: {
                                                    svg: {
                                                        src: require('../assets/images/bao-tri-sua-chua.svg'),
                                                        width: LibCustom.viewScreen(45, 'vw'),
                                                        height: LibCustom.viewScreen(6, 'vh'),
                                                        fill: "#2E7D32",
                                                    },
                                                    text: {
                                                        style: {
                                                            fontSize: LibCustom.scaleFontSize(12)
                                                        },
                                                        title: "Bảo trì sửa chữa"

                                                    }
                                                }

                                            },

                                            {

                                                id: 1,
                                                style: {
                                                    marginRight: LibCustom.viewScreen(3, 'vw'),
                                                },
                                                classObject: {
                                                    'col-6': true,
                                                },
                                                data: {
                                                    svg: {
                                                        src: require('../assets/images/tien-do-dich-vu.svg'),
                                                        width: LibCustom.viewScreen(45, 'vw'),
                                                        height: LibCustom.viewScreen(6, 'vh'),
                                                        fill: "#E65100",
                                                    },
                                                    text: {
                                                        style: {
                                                            fontSize: LibCustom.scaleFontSize(12)
                                                        },
                                                        title: "Tiến độ dịch vụ"

                                                    }
                                                }

                                            },
                                        ]
                                    }
                                ];
                                this.setRowDataNavbar(rowData);
                                styleNavbar = {height: LibCustom.viewScreen(45, 'vh')};
                                this.setStyleNavbar(styleNavbar);
                                let backgroundNavbar = {
                                    image:{
                                        src: require('../assets/images/thong-bao.gif'),
                                    }
                                };
                                this.setBackgroundNavbar(backgroundNavbar);
                                this.saveScreen(name);
                            }

                        } else {
                            this.navigation.navigate("Login");
                        }
                        break;
                    case 2 :
                        name = "DichVu";
                        if (this.isLogin()) {
                            if (this.listScreenSave.indexOf(name) !== -1) {
                                this.setScreen(name);
                            } else {
                                this.setName(name);
                                this.onlyEnableComponent('navbar');
                                this.setTitleHeader("Dịch vụ");
                                this.setIconHeader({name: 'menu'});
                                this.setRouteHeader("menu");
                                rowData = [
                                    {
                                        id: 0,
                                        style: {
                                            paddingTop: LibCustom.viewScreen(3, 'vw'),
                                            paddingBottom: LibCustom.viewScreen(3, 'vw'),
                                        },
                                        data: [
                                            {

                                                id: 0,
                                                style: {
                                                    marginLeft: LibCustom.viewScreen(3, 'vw'),
                                                    marginRight: LibCustom.viewScreen(3, 'vw'),
                                                },
                                                classObject: {
                                                    'col-12': true,
                                                },
                                                data: {
                                                    svg: {
                                                        src: require('../assets/images/dangkidichvu.svg'),
                                                        width: LibCustom.viewScreen(100, 'vw'),
                                                        height: LibCustom.viewScreen(8, 'vh'),
                                                        fill: "#512DA8",
                                                    },
                                                    text: {
                                                        style: {
                                                            fontSize: LibCustom.scaleFontSize(12)
                                                        },
                                                        title: "Đăng kí dịch vụ"

                                                    }
                                                }
                                            },
                                        ]
                                    },
                                    {
                                        id: 1,
                                        style: {
                                            paddingBottom: LibCustom.viewScreen(3, 'vw'),
                                        },
                                        data: [
                                            {

                                                id: 0,
                                                style: {
                                                    marginLeft: LibCustom.viewScreen(3, 'vw'),
                                                    marginRight: LibCustom.viewScreen(3, 'vw'),
                                                    paddingLeft: '2.5%',
                                                },
                                                classObject: {
                                                    'col-12': true,
                                                },
                                                data: {
                                                    svg: {
                                                        src: require('../assets/images/phananhgopy.svg'),
                                                        width: LibCustom.viewScreen(100, 'vw'),
                                                        height: LibCustom.viewScreen(8, 'vh'),
                                                    },
                                                    text: {
                                                        style: {
                                                            fontSize: LibCustom.scaleFontSize(12),
                                                            paddingRight: '3%',
                                                        },
                                                        title: "Góp ý"

                                                    }
                                                }
                                            },
                                        ]
                                    },
                                ];
                                this.setRowDataNavbar(rowData);
                                styleNavbar = {height: LibCustom.viewScreen(30, 'vh')};
                                this.setStyleNavbar(styleNavbar);
                                let backgroundNavbar = {
                                    image:{
                                        src: require('../assets/images/dich-vu.gif'),
                                    }
                                };
                                this.setBackgroundNavbar(backgroundNavbar);
                                this.saveScreen(name);
                            }
                        } else {
                            this.navigation.navigate("Login");
                        }
                        break;
                    case 3 :
                        name = "TraCuu";
                        if (this.isLogin()) {
                            if (this.listScreenSave.indexOf(name) !== -1) {
                                this.setScreen(name);
                            } else {
                                this.setName(name);
                                this.onlyEnableComponent('navbar');
                                this.setTitleHeader("Tra cứu");
                                this.setIconHeader({name: 'menu'});
                                this.setRouteHeader("menu");
                                rowData = [
                                    {
                                        id: 0,
                                        style: {
                                            paddingTop: LibCustom.viewScreen(3, 'vw'),
                                            paddingBottom: LibCustom.viewScreen(3, 'vw'),
                                        },
                                        data: [
                                            {

                                                id: 0,
                                                style: {
                                                    marginLeft: LibCustom.viewScreen(3, 'vw'),
                                                    marginRight: LibCustom.viewScreen(3, 'vw'),
                                                },
                                                classObject: {
                                                    'col-12': true,
                                                },
                                                data: {
                                                    svg: {
                                                        src: require('../assets/images/thong-tin-phi-ql.svg'),
                                                        width: LibCustom.viewScreen(100, 'vw'),
                                                        height: LibCustom.viewScreen(6, 'vh'),
                                                        fill: "#FFA000",
                                                    },
                                                    text: {
                                                        style: {
                                                            fontSize: LibCustom.scaleFontSize(12),
                                                            marginTop: '1.5%',
                                                        },
                                                        title: "Thông tin phí quản lý"

                                                    }
                                                }
                                            },
                                        ]
                                    },
                                    {
                                        id: 1,
                                        style: {
                                            paddingBottom: LibCustom.viewScreen(3, 'vw'),
                                        },
                                        data: [
                                            {

                                                id: 0,
                                                style: {
                                                    marginLeft: LibCustom.viewScreen(3, 'vw'),
                                                    marginRight: LibCustom.viewScreen(3, 'vw'),
                                                    paddingLeft: '1%',
                                                },
                                                classObject: {
                                                    'col-12': true,
                                                },
                                                data: {
                                                    svg: {
                                                        src: require('../assets/images/hoadondiennuoc.svg'),
                                                        width: LibCustom.viewScreen(100, 'vw'),
                                                        height: LibCustom.viewScreen(8, 'vh'),
                                                        fill: "#43A047",
                                                    },
                                                    text: {
                                                        style: {
                                                            fontSize: LibCustom.scaleFontSize(12),
                                                            paddingRight: '3%',
                                                        },
                                                        title: "Hóa đơn điện nước"

                                                    }
                                                }
                                            },
                                        ]
                                    },
                                    {
                                        id: 2,
                                        style: {
                                            paddingBottom: LibCustom.viewScreen(3, 'vw'),
                                        },
                                        data: [
                                            {

                                                id: 0,
                                                style: {
                                                    marginLeft: LibCustom.viewScreen(3, 'vw'),
                                                    marginRight: LibCustom.viewScreen(3, 'vw'),
                                                },
                                                classObject: {
                                                    'col-12': true,
                                                },
                                                data: {
                                                    svg: {
                                                        src: require('../assets/images/cac-loai-phi-khac.svg'),
                                                        width: LibCustom.viewScreen(100, 'vw'),
                                                        height: LibCustom.viewScreen(8, 'vh'),
                                                        fill: "#0097A7"
                                                    },
                                                    text: {
                                                        style: {
                                                            fontSize: LibCustom.scaleFontSize(12),
                                                            paddingRight: '3%',
                                                        },
                                                        title: "Các loại phí khác"

                                                    }
                                                }
                                            },
                                        ]
                                    },
                                ];
                                this.setRowDataNavbar(rowData);
                                styleNavbar = {height: LibCustom.viewScreen(50, 'vh')};
                                this.setStyleNavbar(styleNavbar);
                                let backgroundNavbar = {
                                    image:{
                                        src: require('../assets/images/tra-cuu.gif'),
                                    }
                                };
                                this.setBackgroundNavbar(backgroundNavbar);
                                this.saveScreen(name);
                            }
                        } else {
                            this.navigation.navigate("Login");
                        }

                        break;
                    case 4 :
                        name = "CaiDat";
                        if (this.isLogin()) {
                            if (this.listScreenSave.indexOf(name) !== -1) {
                                this.setScreen(name);
                            } else {
                                this.setName(name);
                                this.onlyEnableComponent('navbar');
                                this.setTitleHeader("Cài đặt");
                                this.setIconHeader({name: 'menu'});
                                this.setRouteHeader("menu");
                                rowData = [
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
                                                    'col-6': true,
                                                },
                                                data: {
                                                    svg: {
                                                        src: require('../assets/images/thong-tin-kh.svg'),
                                                        width: LibCustom.viewScreen(45, 'vw'),
                                                        height: LibCustom.viewScreen(6, 'vh'),
                                                        fill: '#C62828'
                                                    },
                                                    text: {
                                                        style: {
                                                            fontSize: LibCustom.scaleFontSize(12)
                                                        },
                                                        title: "Thông tin khách hàng"

                                                    }
                                                }

                                            },
                                            {

                                                id: 1,
                                                style: {
                                                    marginRight: LibCustom.viewScreen(3, 'vw'),
                                                },
                                                classObject: {
                                                    'col-6': true,
                                                },
                                                data: {
                                                    svg: {
                                                        src: require('../assets/images/thong-tin-ung-dung.svg'),
                                                        width: LibCustom.viewScreen(45, 'vw'),
                                                        height: LibCustom.viewScreen(6, 'vh'),
                                                        fill: "#C62828"
                                                    },
                                                    text: {
                                                        style: {
                                                            fontSize: LibCustom.scaleFontSize(12)
                                                        },
                                                        title: "Thông tin ứng dụng"

                                                    }
                                                }

                                            },

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
                                                    'col-6': true,
                                                },
                                                data: {
                                                    svg: {
                                                        src: require('../assets/images/thay-doi-pass.svg'),
                                                        width: LibCustom.viewScreen(45, 'vw'),
                                                        height: LibCustom.viewScreen(6, 'vh'),
                                                        fill: "#C62828"
                                                    },
                                                    text: {
                                                        style: {
                                                            fontSize: LibCustom.scaleFontSize(12)
                                                        },
                                                        title: "Đổi mật khẩu"

                                                    }
                                                }

                                            },

                                            {

                                                id: 1,
                                                style: {
                                                    marginRight: LibCustom.viewScreen(3, 'vw'),
                                                },
                                                classObject: {
                                                    'col-6': true,
                                                },
                                                data: {
                                                    svg: {
                                                        src: require('../assets/images/dang-xuat.svg'),
                                                        width: LibCustom.viewScreen(45, 'vw'),
                                                        height: LibCustom.viewScreen(6, 'vh'),
                                                        fill: "#C62828"
                                                    },
                                                    text: {
                                                        style: {
                                                            fontSize: LibCustom.scaleFontSize(12)
                                                        },
                                                        title: "Đăng xuất"

                                                    }
                                                }

                                            },
                                        ]
                                    }
                                ];
                                this.setRowDataNavbar(rowData);
                                styleNavbar = {height: LibCustom.viewScreen(35, 'vh')};
                                this.setStyleNavbar(styleNavbar);
                                let backgroundNavbar = {
                                    image:{
                                        src: require('../assets/images/cai-dat.gif'),
                                    }
                                };
                                this.setBackgroundNavbar(backgroundNavbar);
                                this.saveScreen(name);
                            }
                        } else {
                            this.navigation.navigate("Login");
                        }
                        break;

                }
                this.itemChecked = key;
            },
        },


    };
</script>
<style>
    .footer {
        flex: 1;
        align-items: flex-end;
        background-color: black;
    }

    .row {
        flex: 1;
        flex-direction: row;
        background-color: white;
        padding-top: 2.5%;
        padding-bottom: 2.5%;
    }

    .col-2 {
        width: 20%;
    }

    .text-center {
        text-align: center;
        padding-right: 8%;
    }


</style>