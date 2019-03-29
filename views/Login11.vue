<template>
    <nb-container>
        <image-background
                :source="{uri: 'https://images.pexels.com/photos/1438834/pexels-photo-1438834.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'}"
                class="imageContainer"
        >
            <nb-container class="overlay"></nb-container>
            <nb-header class="header-background">
                <nb-left>
                    <nb-button transparent>
                        <nb-icon name="arrow-back"/>
                    </nb-button>
                </nb-left>
                <nb-body>
                    <nb-title :style="{paddingLeft: '20%'}">Đăng Nhập</nb-title>
                </nb-body>
            </nb-header>
            <nb-content class="container" :style="{paddingTop: '50%', paddingLeft: '10%', paddingRight: '10%'}">
                <view>
                    <view class="imageContainer block-center">
                        <AutoHeightImage
                                :width="200"
                                :source="{uri: 'https://zalo-file-dl1.zdn.vn/87c5878bbc5950070948/6019484968225534778'}"
                        />
                    </view>
                    <nb-form>
                        <nb-item>
                            <nb-input placeholder="Username" class="textColor borderColor mt-20 px-20"
                                      placeholderTextColor="white"
                                      :on-focus="handleFocusUsername"
                                      :class="{'bg-black-20': isFocusUsername}"
                            />
                        </nb-item>
                        <nb-item last>
                            <nb-input placeholder="Password"
                                      class="textColor borderColor mt-20 px-20"
                                      auto-capitalize="none" secure-text-entry placeholderTextColor="white"
                                      :on-focus="handleFocusPassword"
                                      :class="{'bg-black-20': isFocusPassword}"
                            />
                        </nb-item>
                        <nb-item>
                            <nb-button danger class="mt-20 container block-center">
                                <nb-text>Đăng Nhập</nb-text>
                            </nb-button>
                        </nb-item>
                    </nb-form>
                </view>
            </nb-content>
        </image-background>

    </nb-container>
</template>
<script>
    import React, {Component} from 'react';
    import AutoHeightImage from 'react-native-auto-height-image';
    import {Constants, MapView, Permissions, Location} from "expo";
    import {mapGetters, mapActions} from 'vuex';
    export default {
        props: {
            navigation: {
                type: Object,
            }
        },
        components: {
            AutoHeightImage,
        },
        computed: {},
        data: function () {
            return {
                isFocusUsername: false,
                isFocusPassword: false,
            };
        },

        methods: {
            handleFocusUsername: function () {
                this.isFocusUsername = true;
                this.isFocusPassword = false;
            },
            handleFocusPassword: function () {
                this.isFocusUsername = false;
                this.isFocusPassword = true;
            }
        },


    };
</script>
<style>
    .imageContainer, .container {
        flex: 1;
        position: relative;
    }

    .overlay {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #023249;
        opacity: 0.35;
    }

    .textColor {
        color: #fff;
    }

    .borderColor {
        border-width: 0.5;
        border-radius: 10;
        border-color: white;
    }

    .mt-20 {
        margin-top: 20;
    }

    .px-20 {
        padding-left: 20;
        padding-right: 20;
    }

    .header-background {
        background-color: rgba(0, 0, 0, 0.15);
    }

    .bg-black-20 {
        background-color: rgba(0, 0, 0, 0.2);
    }

    .block-center {
        justify-content: center;
        align-items: center;
    }

</style>