<template>
    <view class="service">
        <view class="header"
              :style="{
                    height: viewScreen(20, 'vh')
              }"
        >
            <view class="row">
                <view class="col-4 text-center">
                    <view class="avatar"
                          :style="{
                                width: viewScreen(14, 'vh'),
                                height: viewScreen(14, 'vh'),

                          }"
                    >
                        <AutoHeightImage
                                :source="require('../assets/images/avatar1.png')"
                                :width="'100%'"
                                :style="{
                                    flex: 1,
                                    resizeMode: 'contain',
                                    borderRadius: screen.width+screen.height/2,
                                    borderWidth: 1
                                }"
                        ></AutoHeightImage>
                    </view>
                </view>
                <view class="col-8" :style="{justifyContent: 'center', height: viewScreen(20, 'vh')}">
                    <nb-text class="text-bold" :style="{fontSize: scaleFontSize(16)}">Vương Ái Phương</nb-text>
                    <nb-text :style="{fontSize: scaleFontSize(12)}">
                        607 Xô Viết Nghệ Tĩnh, P.26, Quận Bình Thạnh dsadsadsadsadsadsadsadasdsadssadasda
                    </nb-text>
                    <nb-text class="text-bold text-id" :style="{fontSize: scaleFontSize(12)}">Mã: 13.04</nb-text>
                </view>
            </view>
        </view>
        <view class="content"
              :style="{
                    width: viewScreen(80, 'vw'),
                    height: viewScreen(80, 'vh')
              }">
            <nb-form>
                <nb-item regular class="mt-3 item"
                         :style="{
                                  borderColor: isNameLabel ? 'blue' : 'grey'
                         }"
                >
                    <nb-label
                            :style="{
                                position: 'absolute',
                                top: isNameLabel ? 0 : '30%',
                                left: 20,
                                fontSize: isNameLabel ? scaleFontSize(9) : scaleFontSize(14),
                                color: isNameLabel ? 'blue' : 'grey',
                            }"
                    >Tên người liên hệ
                    </nb-label>
                    <nb-input
                            :style="{
                                 position: 'absolute',
                                 top: 0,
                                 left: 20,
                                 width: '100%',
                                 fontSize: scaleFontSize(14),
                            }"
                            :on-focus="handleFocusName"
                            v-model="myName"
                            :on-change-text="handleChangeValueName"
                    />
                </nb-item>
                <nb-item regular class="mt-3 item"
                         :style="{
                                  borderColor: isSDTLabel ? 'blue' : 'grey'
                         }"
                >
                    <nb-label
                            :style="{
                                position: 'absolute',
                                top: isSDTLabel ? 0 : '30%',
                                left: 20,
                                fontSize: isSDTLabel ? scaleFontSize(9) : scaleFontSize(14),
                                color: isSDTLabel ? 'blue' : 'grey',
                            }"
                    >Số điện thoại
                    </nb-label>
                    <nb-input
                            :style="{
                                 position: 'absolute',
                                 top: 0,
                                 left: 20,
                                 width: '100%',
                                 fontSize: scaleFontSize(14),
                            }"
                            :on-focus="handleFocusSDT"
                            v-model="sdt"
                            :on-change-text="handleChangeValueSDT"
                    />
                </nb-item>
                <nb-item picker regular class="mt-3 pl-3 item" :style="{borderColor: 'grey'}">
                    <nb-picker
                            mode="dropdown"
                            :iosIcon="getIosIcon()"
                            :style="{ width: '100%' }"
                            placeholder="Loại phản ánh góp ý"
                            placeholderStyle="{ color: '#bfc6ea' }"
                            placeholderIconColor="#007aff"
                            :selectedValue="'hethongchieusang'"
                    >

                        <item v-for="todo in listLoaiDV" :key="todo.ma" :label="todo.mota" :value="todo.ma"></item>
                    </nb-picker>
                </nb-item>

                <nb-textarea class="mt-3dot5" :rowSpan="5" bordered placeholder="Nội dung phản ánh góp ý"
                             :style="{width: '100%', paddingLeft: '5%', paddingTop: '2%', fontSize: scaleFontSize(14)}"/>

                    <nb-button full iconRight light :on-press="sendFeedback" class="button-bg mt-3">
                        <nb-text class="button-feedback button-title" :style="{fontSize: scaleFontSize(14)}">GỬI ĐĂNG KÝ</nb-text>
                        <nb-icon class="button-feedback button-icon" active name="arrow-forward"/>
                    </nb-button>


            </nb-form>
        </view>
    </view>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex';
    import LibCustom from '../library/custom';
    import AutoHeightImage from 'react-native-auto-height-image';
    import axios from "axios";
    import React from "react";
    import { Picker, Icon } from "native-base";
    const url_lay_ds_loai_dv = "http://ws.venuscorp.vn/WS_VENUSAPP/VenusCSKH/lay_ds_loaidichvu";
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    };
    export default {
        props: {
        },
        data: function () {
            return {
                screen: {
                    width: 0,
                    height: 0,
                },
                isNameLabel: false,
                myName: '',
                isSDTLabel: false,
                sdt: '',
                listLoaiDV: null,
            };
        },
        components: {
            AutoHeightImage
        },
        computed: {
            getInforUser: function(){
                console.log(this.getUser);
                return this.getUser();
            }
        },
        mounted: function () {
            this.screen = LibCustom.getSizeScreen();
            console.log(this.getUser());
            axios.post(url_lay_ds_loai_dv, config).then((response) => {
                this.listLoaiDV = response.data.data.danhmuc_loaidichvu;
            }).catch(function(error){
                console.log(error);
            })

        },
        methods: {
            ...mapGetters("login", ['getUser']),
            scaleFontSize: function (size) {
                return LibCustom.scaleFontSize(size);
            },
            viewScreen: function (percent, type, minus = 0) {
                return LibCustom.viewScreen(percent, type, minus);
            },
            handleFocusName: function () {
                this.isNameLabel = true;
                if (this.sdt === "") {
                    this.isSDTLabel = false;
                } else {
                    this.isSDTLabel = true;
                }
            },
            handleChangeValueName: function () {
                if (this.myName === "") {
                    this.isNameLabel = false;
                } else {
                    this.isNameLabel = true;
                }
            },
            handleFocusSDT: function () {
                this.isSDTLabel = true;
                if (this.myName === "") {
                    this.isNameLabel = false;
                } else {
                    this.isNameLabel = true;
                }

            },
            handleChangeValueSDT: function () {
                if (this.sdt === "") {
                    this.isSDTLabel = false;
                } else {
                    this.isSDTLabel = true;
                }
            },
            sendFeedback: function () {
                alert("send feed back");
            },
            getIosIcon: function() {
                return <Icon name="ios-arrow-down-outline" />;
            }
        },


    };
</script>
<style>
    .service {
        flex: 1;
        justify-content: center;
        align-items: center;
    }

    .header {
        background-color: rgba(0, 0, 0, 0.5);
    }

    .row {
        flex: 1;
        flex-direction: row;
    }

    .col-4 {
        width: 33.33%;
    }

    .text-center {
        justify-content: center;
        align-items: center;
    }

    .col-8 {
        width: 66.67%;
    }

    .text-bold {
        font-weight: bold;
    }

    .text-id {
        color: orange;
    }

    .content {
        flex: 1;
    }

    .item {
        position: relative;
        height: 13%;
    }

    .mt-3 {
        margin-top: 3%;
    }

    .pl-3 {
        padding-left: 3%;
    }

    .button-feedback {
        color: white;
        font-weight: bold;
    }

    .button-bg {
        background-color: #303F9F;
        position: relative;
        height: 14%;
    }
    .button-title{
        position: absolute;
        left: 0;
    }
    .button-icon{
        position: absolute;
        right: 0;
    }

</style>