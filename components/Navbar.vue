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
    import {Dimensions, Animated, Easing} from 'react-native'
    import AutoHeightImage from 'react-native-auto-height-image';
    import {Constants, MapView, Permissions, Location} from "expo";
    import LibCustom from '../library/custom';
    import SvgUri from 'react-native-svg-uri';
    import {mapGetters, mapActions} from 'vuex';
    import axios from "axios";
    import qs from "qs";
    const moment = require('moment');
    import * as vi from 'moment/locale/vi';
    const urlThongBaoChung = "http://ws.venuscorp.vn/WS_VENUSAPP/VenusCSKH/lay_ds_tatca_thongbao";
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    };
    export default {
        props: {},
        data: function () {
            return {
                screen: {
                    width: 0,
                    height: 0,
                },
            };
        },
        components: {
            AutoHeightImage,
            SvgUri
        },
        computed: {
            dataNavbar: function () {
                let temp = this.getNavbar();
                return this.getNavbar();
            },
            isLogin: function () {
//                return function(){
//                    return true;
//                }
                return this.checkLogin;
            },
            getBackground: function(){
                let obj = {};
                if(this.dataNavbar.bgNavbar.image.src !== ""){
                    obj = {
                        width: this.screen.width,
                        height: this.screen.height,
                    }
                }
                return obj;
            }
        },
        created: function(){
            moment.locale('vi');
        },
        mounted: function () {
            this.screen = LibCustom.getSizeScreen();
        },
        methods: {
            ...mapGetters("screenBaseOnFooter", ["getNavbar", "getNavigation"]),
            ...mapGetters("login", ['checkLogin', 'getUserName']),
            ...mapActions("screenBaseOnFooter",
                [
                    'disableComponent',
                    'enableComponent',
                    'setTitleHeader',
                    'setRowDataNavbar',
                    'setStyleNavbar',
                    'setIconHeader',
                    'setRouteHeader',
                    'setDataContent',
                ]),
            scaleFontSize: function (size) {
                return LibCustom.scaleFontSize(size);
            },
            viewScreen: function (percent, type, minus = 0) {
                return LibCustom.viewScreen(percent, type, minus);
            },

            handleClick: function (text) {
                let convertStr = LibCustom.convertUTF8(text);
                switch (convertStr) {
                    /* thong bao */
                    case "thong-bao-chung" :
                        if (this.isLogin()) {
                            this.disableComponent(['carousel', 'navbar']);
                            this.enableComponent('content');
                            this.setTitleHeader("Thông báo chung");
                            this.setIconHeader({name: 'ios-arrow-back', type: 'Ionicons'});
                            this.setRouteHeader("back");
                            let data = {
                                username: this.getUserName(),
                                maChungThuc: LibCustom.ma_hoa(this.getUserName()),
                            };
                            axios.post(urlThongBaoChung, qs.stringify(data), config).then((response) => {
                                let arrayDataContent = [];
                                let listData = response.data.data;
                                for (let i = 0, size = listData.length; i < size; i++) {
                                    let temp = {
                                        id: i,
                                        editable: false,
                                        allowEditable: true,
                                        image: {
                                            src: require('../assets/images/img-01.jpg'),
                                            width: 0,
                                            height: 0,
                                        },
                                        data: {
                                            title: 'Cty venus ',
                                            description: listData[i].noidung,
                                            time: moment(listData[i].ngay_tao).fromNow(),
                                        }
                                    };
                                    arrayDataContent.push(temp);
                                }
                                this.setDataContent(arrayDataContent);
                            }).catch(function (error) {
                                console.log(error);
                            })

                        } else {
                            this.getNavigation().navigate("Login");
                        }
                        break;
                    case "thong-bao-tu-ban-quan-ly" :
                        if (this.isLogin()) {
                            this.disableComponent(['carousel', 'navbar']);
                            this.enableComponent('content');
                            this.setTitleHeader("Thông báo chung");
                            this.setIconHeader({name: 'ios-arrow-back', type: 'Ionicons'});
                            this.setRouteHeader("back");
                            let data = {
                                username: this.getUserName(),
                                maChungThuc: LibCustom.ma_hoa(this.getUserName()),
                            };
                            axios.post(urlThongBaoChung, qs.stringify(data), config).then((response) => {
                                let arrayDataContent = [];
                                let listData = response.data.data;

                                for (let i = 0, size = listData.length; i < size; i++) {
                                    let temp = {
                                        id: i,
                                        editable: false,
                                        allowEditable: true,
                                        image: {
                                            src: require('../assets/images/img-01.jpg'),
                                            width: 0,
                                            height: 0,
                                        },
                                        data: {
                                            title: 'Cty venus ',
                                            description: listData[i].noidung,
                                            time: moment(listData[i].ngay_tao).fromNow(),
                                        }
                                    };
                                    arrayDataContent.push(temp);
                                }
                                this.setDataContent(arrayDataContent);
                            }).catch(function (error) {
                                console.log(error);
                            })
                        } else {
                            this.getNavigation().navigate("Login");
                        }
                        break;
                    case "thong-bao-phi-dich-vu":
                        if (this.isLogin()) {
                            this.disableComponent(['carousel', 'navbar']);
                            this.enableComponent('content');
                            this.setTitleHeader("Thông báo chung");
                            this.setIconHeader({name: 'ios-arrow-back', type: 'Ionicons'});
                            this.setRouteHeader("back");
                            let data = {
                                username: this.getUserName(),
                                maChungThuc: LibCustom.ma_hoa(this.getUserName()),
                            };
                            axios.post(urlThongBaoChung, qs.stringify(data), config).then((response) => {
                                let arrayDataContent = [];
                                let listData = response.data.data;

                                for (let i = 0, size = listData.length; i < size; i++) {
                                    let temp = {
                                        id: i,
                                        editable: false,
                                        allowEditable: true,
                                        image: {
                                            src: require('../assets/images/img-01.jpg'),
                                            width: 0,
                                            height: 0,
                                        },
                                        data: {
                                            title: 'Cty venus ',
                                            description: listData[i].noidung,
                                            time: moment(listData[i].ngay_tao).fromNow(),
                                        }
                                    };
                                    arrayDataContent.push(temp);
                                }
                                this.setDataContent(arrayDataContent);
                            }).catch(function (error) {
                                console.log(error);
                            })
                        } else {
                            this.getNavigation().navigate("Login");
                        }
                        break;
                    /* Dich vu */
                    case "dang-ki-dich-vu":
                        break;
                    case "gop-y":
                        if (this.isLogin()) {
                            alert("nhảy vào đây");
                            this.disableComponent(['carousel', 'navbar', 'content']);
                            this.enableComponent('feedback');
                            this.setTitleHeader("Phản ánh góp ý");
                            this.setIconHeader({name: 'ios-arrow-back', type: 'Ionicons'});
                            this.setRouteHeader("back");
                        } else {
                            this.getNavigation().navigate("Login");
                        }
                        break;
                    /* Tra cuu */
                    case "thong-tin-phi-quan-ly":
                        let data = {
                            username: this.getUserName(),
                            maChungThuc: LibCustom.ma_hoa(this.getUserName()),
                        };
                        axios.post(urlThongBaoChung, qs.stringify(data), config).then((response) => {
                            let arrayDataContent = [];
                            let listData = response.data.data;

                            for (let i = 0, size = listData.length; i < size; i++) {
                                let temp = {
                                    id: i,
                                    editable: false,
                                    allowEditable: true,
                                    image: {
                                        src: require('../assets/images/img-01.jpg'),
                                        width: 0,
                                        height: 0,
                                    },
                                    data: {
                                        title: 'Cty venus ',
                                        description: listData[i].noidung,
                                        time: moment(listData[i].ngay_tao).fromNow(),
                                    }
                                };
                                arrayDataContent.push(temp);
                            }
                            this.setDataContent(arrayDataContent);
                        }).catch(function (error) {
                            console.log(error);
                        })
                        break;
                }
            }
        },


    };
</script>
<style>
    .container{
        flex: 1;
    }
    .bgBottom{
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