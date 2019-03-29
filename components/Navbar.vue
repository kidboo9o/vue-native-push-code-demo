<template>
    <view class="navbar" :style="{height: viewScreen(30, 'vh')}">
        <view class="row" :style="{paddingTop: viewScreen(3, 'vw'), paddingBottom: viewScreen(3, 'vw')}">
            <touchable-opacity class="col-6 nav-item flex-center"
                  :style="{
                    marginLeft: viewScreen(3, 'vw'),
                    marginRight: viewScreen(3, 'vw'),

                  }">
                <SvgUri
                        :source="require('../assets/images/thongtinbanquanly.svg')"
                        :width="viewScreen(50, 'vw')"
                        :height="viewScreen(8, 'vh')"
                />
                <nb-text
                        :style="{fontSize: scaleFontSize(14)}"
                        class="text-color text-center">Thông báo từ ban quản lý
                </nb-text>
            </touchable-opacity>
            <touchable-opacity  class="col-6 nav-item flex-center"
                  :style="{
                       marginRight: viewScreen(3, 'vw'),

                  }">
                <SvgUri
                        :source="require('../assets/images/hoadondiennuoc.svg')"
                        :width="viewScreen(45, 'vw')"
                        :height="viewScreen(8, 'vh')"
                />
                <nb-text
                        :style="{fontSize: scaleFontSize(14)}"
                        class="text-color text-center">Hóa đơn điện nước
                </nb-text>

            </touchable-opacity >
        </view>
        <view class="row" :style="{paddingBottom: viewScreen(3, 'vw')}">
            <touchable-opacity  class="col-6 nav-item flex-center"
                  :style="{
                        marginLeft: viewScreen(3, 'vw'),
                        marginRight: viewScreen(3, 'vw'),

                  }">
                <SvgUri
                        :source="require('../assets/images/phananhgopy.svg')"
                        :width="viewScreen(45, 'vw')"
                        :height="viewScreen(8, 'vh')"
                />
                <nb-text
                        :style="{fontSize: scaleFontSize(14)}"
                        class="text-color text-center">Phản ánh góp ý
                </nb-text>

            </touchable-opacity >
            <touchable-opacity  class="col-6 nav-item flex-center"
                  :style="{
                        marginRight: viewScreen(3, 'vw'),

                   }">
                <SvgUri
                        :source="require('../assets/images/dangkidichvu.svg')"
                        :width="viewScreen(45, 'vw')"
                        :height="viewScreen(8, 'vh')"
                />
                <nb-text
                        :style="{fontSize: scaleFontSize(14)}"
                        class="text-color text-center">Đăng kí dịch vụ
                </nb-text>
            </touchable-opacity >
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

    export default {
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
        computed: {},
        mounted: function () {
            this.screen = LibCustom.getSizeScreen();
        },
        methods: {
            scaleFontSize: function (size) {
                return LibCustom.scaleFontSize(size);
            },
            viewScreen: function (percent, type, minus = 0) {
                return LibCustom.viewScreen(percent, type, minus);
            },
            handleClick: function(){
                alert("ban vua click xong");
            }
        },


    };
</script>
<style>
    .navbar {
        background-color: #303f9f;
        width: 100%;
        height: 40%;
    }

    .row {
        flex: 1;
        flex-direction: row;
    }

    .col-6 {
        width: 45.5%;
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
    .text-center{
        text-align: center;
    }


</style>