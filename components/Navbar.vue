<template>
    <view class="navbar" :style="dataNavbar.style">
        <view class="row" v-for="rowNav in dataNavbar.row" :style="rowNav.style">
            <touchable-opacity v-for="col in rowNav.data" class="nav-item flex-center"
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

    export default {
        props: {
            dataNavbar: {
                type: Object
            }
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
            handleClick: function () {
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

    .text-center {
        text-align: center;
    }


</style>