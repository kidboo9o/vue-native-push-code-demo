<template>
    <view class="container" :style="getBackground">
        <view class="bgBottom"
              v-if="dataNavbar.bgNavbar.image.src !== ''"
        >
            <view class="flex-center">
                <AutoHeightImage
                        :source="dataNavbar.bgNavbar.image.src"
                        :width="viewScreen(90, 'vw')"
                        :height="200"
                        :style="{flex: 1, resizeMode: 'contain'}"
                ></AutoHeightImage>
            </view>
        </view>
        <view class="navbar" :style="dataNavbar.data.style">
            <view class="row" v-for="rowNav in dataNavbar.data.row" :style="rowNav.style">
                <touchable-opacity v-for="col in rowNav.data" class="nav-item flex-center"
                                   :on-press="() => handleClick(col.data.text.title)"
                                   :class="col.classObject"
                                   :style="col.style">
                    <SvgUri
                            :source="col.data.svg.src"
                            :width="col.data.svg.width"
                            :height="col.data.svg.height"
                            :fill="col.data.svg.fill"
                    />
                    <nb-text
                            :style="col.data.text.style"
                            class="text-color text-center">{{col.data.text.title}}
                    </nb-text>
                </touchable-opacity>
            </view>
        </view>
    </view>
</template>
<script>
    import React, {Component} from 'react';
    import {Dimensions, Animated, Easing, AppRegistry, NetInfo, Text, View} from 'react-native';
    import AutoHeightImage from 'react-native-auto-height-image';
    import { SQLite } from "expo";
    import LibCustom from '../library/custom';
    import SvgUri from 'react-native-svg-uri';
    import {mapGetters, mapActions} from 'vuex';
    import axios from "axios";
    import qs from "qs";
    import StoreScreenTemplateIconFooter from "../store/StoreScreenTemplateIconFooter";
    const moment = require('moment');
    import * as vi from 'moment/locale/vi';
    const urlThongBaoChung = "http://ws.venuscorp.vn/WS_VENUSAPP/VenusCSKH/lay_ds_tatca_thongbao";
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    };
    import localDeviceStorage from "../library/localStorage";
    export default {
        props: {
            navigation:{
                type: Object
            }
        },
        data: function () {
            return {
                isConnected: null,
                screen: {
                    width: 0,
                    height: 0,
                },
            };
        },
        components: {
            AutoHeightImage,
            SvgUri,
        },
        computed: {
            dataNavbar: function () {
                let temp = this.getNavbar();
                return this.getNavbar();
            },
            isLogin: function () {
                return this.checkLogin;
            },
            getBackground: function () {
                let obj = {};
                if (this.dataNavbar.bgNavbar.image.src !== "") {
                    obj = {
                        width: this.screen.width,
                        height: this.screen.height,
                    }
                }
                return obj;
            },
            listScreenSave: function () {
                return this.getListScreenSaved();
            }
        },
        created: function () {
            moment.locale('vi');
        },
        mounted: function () {
            this.screen = LibCustom.getSizeScreen();
            if(!this.$store._modulesNamespaceMap['StoreScreenTemplateIconFooter/']){
                this.$store.registerModule('StoreScreenTemplateIconFooter', StoreScreenTemplateIconFooter);
            }
            NetInfo.isConnected.addEventListener(
                'connectionChange',
                this._handleConnectivityChange
            );
            NetInfo.isConnected.fetch().done(
                (isConnected) => {
                    this.isConnected = isConnected;
                }
            );
        },
        methods: {
            ...mapGetters("screenBaseOnFooter", ["getNavbar", "getListScreenSaved", "getScreenCurrent"]),
            ...mapGetters("login", ['checkLogin', 'getUserName']),
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
                    'setDataContent',
                    'onlyEnableComponent',
                    'setStyleContainer',
                    'setListStep',
                    'setScreenByLocalFile'
                ]),
            ...mapActions("StoreScreenTemplateIconFooter", ["onlyEnableComponent_TemplateIconFooter", "setTypeShowListInforUser"]),
            ...mapActions("login", ["removeUser"]),
            _handleConnectivityChange: function(isConnected){
                this.isConnected = isConnected;
            },
            scaleFontSize: function (size) {
                return LibCustom.scaleFontSize(size);
            },
            viewScreen: function (percent, type, minus = 0) {
                return LibCustom.viewScreen(percent, type, minus);
            },

            handleClick: function (text) {
                let convertStr = LibCustom.convertUTF8(text);
                let name;
                switch (convertStr) {
                        /* thong bao */
                    case "thong-bao":
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
                    case "thong-bao-chung" :
                        if (this.isLogin()) {
                            name = "ThongBaoChung";
                            this.setListStep(name);
                            this.setName(name);
                            this.onlyEnableComponent('content');
                            this.setTitleHeader("Thông báo chung");
                            this.setIconHeader({name: 'ios-arrow-back', type: 'Ionicons'});
                            this.setRouteHeader("back");
                            if(this.isConnected){ // Online
                                let data = {
                                    username: this.getUserName(),
                                    maChungThuc: LibCustom.ma_hoa(this.getUserName()),
                                };
                                axios.post(urlThongBaoChung, qs.stringify(data), config).then((response) => {
                                    let arrayDataContent = [];
                                    let listData = response.data.data.filter((item) => {
                                        return item.loaithongbao == 1;
                                    });
                                    for (let i = 0, size = listData.length; i < size; i++) {
                                        let temp = {
                                            id: i,
                                            editable: false,
                                            allowEditable: true,
                                            image: {
                                                src: {uri: listData[i].link_hinh},
                                                width: 0,
                                                height: 0,
                                            },
                                            data: {
                                                title: listData[i].tieude,
                                                description: listData[i].noidung,
                                                time: moment(listData[i].ngay_tao).fromNow(),
                                            }
                                        };
                                        arrayDataContent.push(temp);
                                    }
                                    this.setDataContent(arrayDataContent);
                                     this.saveScreen(name);
                                    let temp = this.getScreenCurrent();
                                    localDeviceStorage.writeFile(name, temp);
                                }).catch(function (error) {
                                    console.log(error);
                                })
                            }else{ // Offline
                                if (this.listScreenSave.indexOf(name) !== -1) {
                                    this.setScreen(name);
                                }else{
                                    localDeviceStorage.checkFileOrDirectoryExists(name).then((value) => {
                                        if(value.exists){
                                            localDeviceStorage.readFile(name).then( (objData) => {
                                                this.setScreenByLocalFile(objData);
                                            })
                                        }else{
                                            console.log("không tồn tại file "+name+" ở local");
                                        }
                                    })
                                }
                            }

                        } else {
                            this.navigation.navigate("Login");
                        }
                        break;
                    case "thong-bao-tu-ban-quan-ly" :
                        if (this.isLogin()) {
                            this.onlyEnableComponent('content');
                            this.setTitleHeader("Thông báo từ ban quản lý");
                            this.setIconHeader({name: 'ios-arrow-back', type: 'Ionicons'});
                            this.setRouteHeader("back");
                            let data = {
                                username: this.getUserName(),
                                maChungThuc: LibCustom.ma_hoa(this.getUserName()),
                            };
                            axios.post(urlThongBaoChung, qs.stringify(data), config).then((response) => {
                                let arrayDataContent = [];
                                let listData = response.data.data.filter((item) => {
                                    return item.loaithongbao == 2;
                                });
                                for (let i = 0, size = listData.length; i < size; i++) {
                                    let temp = {
                                        id: i,
                                        editable: false,
                                        allowEditable: true,
                                        image: {
                                            src: {uri: listData[i].link_hinh},
                                            width: 0,
                                            height: 0,
                                        },
                                        data: {
                                            title: listData[i].tieude,
                                            description: listData[i].noidung,
                                            time: moment(listData[i].ngay_tao).fromNow(),
                                        }
                                    };
                                    arrayDataContent.push(temp);
                                }
                                this.setDataContent(arrayDataContent);
                                this.saveScreen(name);
                            }).catch(function (error) {
                                console.log(error);
                            })
                        } else {
                            this.navigation.navigate("Login");
                        }
                        break;
                    case "thong-bao-phi-dich-vu":
                        if (this.isLogin()) {
                            this.onlyEnableComponent('content');
                            this.setTitleHeader("Thông báo phí dịch vụ");
                            this.setIconHeader({name: 'ios-arrow-back', type: 'Ionicons'});
                            this.setRouteHeader("back");
                            let data = {
                                username: this.getUserName(),
                                maChungThuc: LibCustom.ma_hoa(this.getUserName()),
                            };
                            axios.post(urlThongBaoChung, qs.stringify(data), config).then((response) => {
                                let arrayDataContent = [];
                                let listData = response.data.data.filter((item) => {
                                    return item.loaithongbao == 3;
                                });
                                for (let i = 0, size = listData.length; i < size; i++) {
                                    let temp = {
                                        id: i,
                                        editable: false,
                                        allowEditable: true,
                                        image: {
                                            src: {uri: listData[i].link_hinh},
                                            width: 0,
                                            height: 0,
                                        },
                                        data: {
                                            title: listData[i].tieude,
                                            description: listData[i].noidung,
                                            time: moment(listData[i].ngay_tao).fromNow(),
                                        }
                                    };
                                    arrayDataContent.push(temp);
                                }
                                this.setDataContent(arrayDataContent);
                                this.saveScreen(name);
                            }).catch(function (error) {
                                console.log(error);
                            })
                        } else {
                            this.navigation.navigate("Login");
                        }
                        break;
                    case "bao-tri-sua-chua":
                        if (this.isLogin()) {
                            this.onlyEnableComponent('content');
                            this.setTitleHeader("Thông báo bảo trì sửa chữa");
                            this.setIconHeader({name: 'ios-arrow-back', type: 'Ionicons'});
                            this.setRouteHeader("back");
                            let data = {
                                username: this.getUserName(),
                                maChungThuc: LibCustom.ma_hoa(this.getUserName()),
                            };
                            axios.post(urlThongBaoChung, qs.stringify(data), config).then((response) => {
                                let arrayDataContent = [];
                                let listData = response.data.data.filter((item) => {
                                    return item.loaithongbao == 4;
                                });
                                for (let i = 0, size = listData.length; i < size; i++) {
                                    let temp = {
                                        id: i,
                                        editable: false,
                                        allowEditable: true,
                                        image: {
                                            src: {uri: listData[i].link_hinh},
                                            width: 0,
                                            height: 0,
                                        },
                                        data: {
                                            title: listData[i].tieude,
                                            description: listData[i].noidung,
                                            time: moment(listData[i].ngay_tao).fromNow(),
                                        }
                                    };
                                    arrayDataContent.push(temp);
                                }
                                this.setDataContent(arrayDataContent);
                                this.saveScreen(name);
                            }).catch(function (error) {
                                console.log(error);
                            })
                        } else {
                            this.navigation.navigate("Login");
                        }
                        break;
                    case "tien-do-dich-vu":
                        if (this.isLogin()) {
                            this.onlyEnableComponent('content');
                            this.setTitleHeader("Thông báo tiến độ dịch vụ");
                            this.setIconHeader({name: 'ios-arrow-back', type: 'Ionicons'});
                            this.setRouteHeader("back");
                            let data = {
                                username: this.getUserName(),
                                maChungThuc: LibCustom.ma_hoa(this.getUserName()),
                            };
                            axios.post(urlThongBaoChung, qs.stringify(data), config).then((response) => {
                                let arrayDataContent = [];
                                let listData = response.data.data.filter((item) => {
                                    return item.loaithongbao == 5;
                                });
                                for (let i = 0, size = listData.length; i < size; i++) {
                                    let temp = {
                                        id: i,
                                        editable: false,
                                        allowEditable: true,
                                        image: {
                                            src: {uri: listData[i].link_hinh},
                                            width: 0,
                                            height: 0,
                                        },
                                        data: {
                                            title: listData[i].tieude,
                                            description: listData[i].noidung,
                                            time: moment(listData[i].ngay_tao).fromNow(),
                                        }
                                    };
                                    arrayDataContent.push(temp);
                                }
                                this.setDataContent(arrayDataContent);
                                this.saveScreen(name);
                            }).catch(function (error) {
                                console.log(error);
                            })
                        } else {
                            this.navigation.navigate("Login");
                        }
                        break;
                        /* Dich vu */
                    case "dang-ki-dich-vu":
                        if (this.isLogin()) {
                            this.setTypeShowListInforUser("full");
                            this.onlyEnableComponent_TemplateIconFooter(["listinforuser","registerservice"]);
                            this.onlyEnableComponent('templatehandleiconfooter');
                            this.setTitleHeader("Đăng kí dịch vụ");
                            this.setIconHeader({name: 'ios-arrow-back', type: 'Ionicons'});
                            this.setRouteHeader("back");
                        } else {
                            this.navigation.navigate("Login");
                        }
                        break;
                    case "gop-y":
                        if (this.isLogin()) {
                            this.setTypeShowListInforUser("full");
                            this.onlyEnableComponent_TemplateIconFooter(["listinforuser","feedback"]);
                            this.onlyEnableComponent('templatehandleiconfooter');
                            this.setTitleHeader("Phản ánh góp ý");
                            this.setIconHeader({name: 'ios-arrow-back', type: 'Ionicons'});
                            this.setRouteHeader("back");
                        } else {
                            this.navigation.navigate("Login");
                        }
                        break;
                        /* Tra cuu */
                    case "thong-tin-phi-quan-ly":
                    case "phi-dich-vu":
                        if (this.isLogin()) {
                            this.setTypeShowListInforUser("full");
                            this.onlyEnableComponent_TemplateIconFooter(["listinforuser", "bill"]);
                            this.onlyEnableComponent('templatehandleiconfooter');
                            this.setTitleHeader("Thông tin phí quản lý ");
                            this.setIconHeader({name: 'ios-arrow-back', type: 'Ionicons'});
                            this.setRouteHeader("back");
                        } else {
                            this.navigation.navigate("Login");
                        }
                        break;
                    case "hoa-don-dien-nuoc":
                        if (this.isLogin()) {
                            this.setTypeShowListInforUser("full");
                            this.onlyEnableComponent_TemplateIconFooter(["listinforuser", "billelectricandwater"]);
                            this.onlyEnableComponent('templatehandleiconfooter');
                            this.setTitleHeader("Hóa đơn điện nước");
                            this.setIconHeader({name: 'ios-arrow-back', type: 'Ionicons'});
                            this.setRouteHeader("back");
                        } else {
                            this.navigation.navigate("Login");
                        }
                        break;
                    case "cac-loai-phi-khac":
                        if (this.isLogin()) {
                            this.setTypeShowListInforUser("full");
                            this.onlyEnableComponent_TemplateIconFooter(["listinforuser", "billanother"]);
                            this.onlyEnableComponent('templatehandleiconfooter');
                            this.setTitleHeader("Các loại phí khác");
                            this.setIconHeader({name: 'ios-arrow-back', type: 'Ionicons'});
                            this.setRouteHeader("back");
                        } else {
                            this.navigation.navigate("Login");
                        }
                        break;
                        /* Cai dat */
                    case "thong-tin-khach-hang":
                        if (this.isLogin()) {
                            this.setTypeShowListInforUser("brief");
                            this.onlyEnableComponent_TemplateIconFooter("listinforuser");
                            this.onlyEnableComponent('templatehandleiconfooter');
                            this.setTitleHeader("Thông tin khách hàng");
                            this.setIconHeader({name: 'ios-arrow-back', type: 'Ionicons'});
                            this.setRouteHeader("back");
                        } else {
                            this.navigation.navigate("Login");
                        }
                        break;
                    case "thong-tin-ung-dung":
                        if (this.isLogin()) {
                            this.setStyleContainer({backgroundColor: 'rgba(0,0,0,0.05)'});
                            this.onlyEnableComponent_TemplateIconFooter("applicationinformation");
                            this.onlyEnableComponent('templatehandleiconfooter');
                            this.setTitleHeader("Thông tin ứng dụng");
                            this.setIconHeader({name: 'ios-arrow-back', type: 'Ionicons'});
                            this.setRouteHeader("back");
                        } else {
                            this.navigation.navigate("Login");
                        }
                        break;
                    case "doi-mat-khau":
                        if (this.isLogin()) {
                            this.setStyleContainer({backgroundColor: 'rgba(0,0,0,0.05)'});
                            this.onlyEnableComponent_TemplateIconFooter("changepassword");
                            this.onlyEnableComponent('templatehandleiconfooter');
                            this.setTitleHeader("Thay đỗi mật khẩu");
                            this.setIconHeader({name: 'ios-arrow-back', type: 'Ionicons'});
                            this.setRouteHeader("back");
                        } else {
                            this.navigation.navigate("Login");
                        }
                        break;
                    case "dang-xuat":
                        if (this.isLogin()) {
                            this.removeUser();
                            this.setScreen("Home");
                        } else {
                            this.navigation.navigate("Login");
                        }
                        break;
                }
            }
        },
        beforeDestroy: function() {
            NetInfo.isConnected.removeEventListener(
                'connectionChange',
                this._handleConnectivityChange
            );
        }
    };
</script>
<style>
    .container {
        flex: 1;
    }

    .bgBottom {
        flex: 1;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #3868D9;
        z-index: 2;
    }

    .navbar {
        width: 100%;
        height: 40%;
        z-index: 3;
    }

    .row {
        flex: 1;
        flex-direction: row;
    }

    .col-4 {
        width: 25%;
    }

    .col-6 {
        width: 50%;
    }

    .col-12 {
        width: 100%;
    }

    .flex-center {
        flex: 1;
        justify-content: center;
        align-items: center;
    }

    .nav-item {
        border-radius: 5;
        background-color: white;
        overflow: hidden;
    }

    .text-color {
        color: #4d4d4d;
    }

    .text-center {
        text-align: center;
    }


</style>