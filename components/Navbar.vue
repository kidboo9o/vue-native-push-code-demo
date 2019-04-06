<template>
    <view class="navbar" :style="dataNavbar.style">
        <view class="row" v-for="rowNav in dataNavbar.row" :style="rowNav.style">
            <touchable-opacity v-for="col in rowNav.data" class="nav-item flex-center" :on-press="() => handleClick(col.data.text.title)"
                               :class="col.classObject"
                               :style="col.style">
                <SvgUri
                        :source="col.data.svg.src"
                        :width="col.data.svg.width"
                        :height="col.data.svg.height"
                />
                <nb-text
                        :style="col.data.text.style"
                        class="text-color text-center">{{col.data.text.title}}
                </nb-text>
            </touchable-opacity>
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
    export default {
        props: {
        },
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
            dataNavbar: function(){
                return this.getNavbar();
            },
            isLogin: function () {
                return this.checkLogin;
            }
        },
        mounted: function () {
            this.screen = LibCustom.getSizeScreen();
        },
        methods: {
            ...mapGetters("screenBaseOnFooter", ["getNavbar"]),
            ...mapGetters("login", ['checkLogin']),
            ...mapActions("screenBaseOnFooter",
                [
                    'disableComponent',
                    'enableComponent',
                    'setTitleHeader',
                    'setRowDataNavbar',
                    'setStyleNavbar',
                    'setIconHeader',
                    'setRouteHeader',
                ]),
            scaleFontSize: function (size) {
                return LibCustom.scaleFontSize(size);
            },
            viewScreen: function (percent, type, minus = 0) {
                return LibCustom.viewScreen(percent, type, minus);
            },
            handleClick: function (text) {
                let convertStr = LibCustom.convertUTF8(text);
                switch(convertStr){
                    case "thong-bao-chung" :
                        if (this.isLogin()) {
                            this.disableComponent(['carousel', 'navbar']);
                            this.enableComponent('content');
                            this.setTitleHeader("Thông báo chung");
                            this.setIconHeader({name: 'ios-arrow-back', type: 'Ionicons'});
                            this.setRouteHeader("back");
                        } else {
                            this.navigation.navigate("Login");
                        }
                    break;

                }
            }
        },


    };
</script>
<style>
    .navbar {
        background-color: white;
        width: 100%;
        height: 40%;
    }

    .row {
        flex: 1;
        flex-direction: row;
    }
    .col-4{
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
        background-color: white;
        border-radius: 5;
        overflow: hidden;
    }

    .text-color {
        color: #4d4d4d;
    }

    .text-center {
        text-align: center;
    }


</style>