<template>
    <view class="content"
              :style="{
                    width: viewScreen(80, 'vw'),
                    height: viewScreen(150, 'vh')
              }">
            <nb-form>
                <nb-item regular class="mt-3 item"
                         :style="{
                                  borderColor: isNameLabel ? 'blue' : (isErrorMyName ? 'red' : 'grey'),
                                  height: viewScreen(8, 'vh')
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
                                 bottom: 0,
                                 left: 20,
                                 width: '80%',
                                 fontSize: scaleFontSize(14),
                            }"
                            :on-focus="handleFocusName"
                            v-model="myName"
                            :on-change-text="handleChangeValueName"
                    />
                    <nb-icon v-if="isErrorMyName" name="close-circle"
                             :style="{
                                position: 'absolute',
                                right: 0,
                                color: '#ed2f2f'
                            }"/>
                </nb-item>
                <nb-item v-if="isErrorMyName"
                         :style="{
                            borderBottomWidth: 0,
                            height: viewScreen(5, 'vh')
                         }"
                >
                    <nb-text class="text-danger"
                             :style="{
                                    fontStyle: 'italic',
                                    fontSize: scaleFontSize(10)
                             }"
                    >{{showErrorMyName}}</nb-text>
                </nb-item>
                <nb-item regular class="mt-3 item"
                         :style="{
                                  borderColor: isErrorSDT ? 'red' : (isSDTLabel ? 'blue' : 'grey'),
                                  height: viewScreen(8, 'vh')
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
                                 bottom: 0,
                                 left: 20,
                                 width: '80%',
                                 fontSize: scaleFontSize(14),
                            }"
                            :on-focus="handleFocusSDT"
                            v-model="sdt"
                            :on-change-text="handleChangeValueSDT"
                    />
                    <nb-icon v-if="isErrorSDT"  name="close-circle"
                             :style="{
                                position: 'absolute',
                                right: 0,
                                color: '#ed2f2f'
                            }"/>
                </nb-item>
                <nb-item v-if="isErrorSDT"
                         :style="{
                            borderBottomWidth: 0,
                            height: viewScreen(5, 'vh')
                         }"
                >
                    <nb-text class="text-danger"
                             :style="{
                                    fontStyle: 'italic',
                                    fontSize: scaleFontSize(10)
                             }"
                    >{{showErrorSDT}}</nb-text>
                </nb-item>
                <nb-item picker regular class="mt-3 pl-3 item" :style="{borderColor: 'grey',height: viewScreen(8, 'vh')}">
                    <nb-picker
                            mode="dropdown"
                            :iosIcon="getIosIcon()"
                            :style="{ width: '100%' }"
                            placeholder="Loại phản ánh góp ý"
                            placeholderStyle="{ color: '#bfc6ea' }"
                            placeholderIconColor="#007aff"
                            :selectedValue="defaultLoaiDV"
                            :onValueChange="onValueChange"
                    >

                        <item v-for="todo in listLoaiDV" :key="todo.ma" :label="todo.mota" :value="todo.ma"></item>
                    </nb-picker>
                </nb-item>

                <nb-textarea class="mt-3" :rowSpan="5" placeholder="Nội dung phản ánh góp ý"
                             :on-focus="handleFocusTextArea"
                             :on-change-text="handleChangeValueNoiDung"
                             v-model="noidung"
                             :style="{
                                    width: '100%',
                                    paddingLeft: '5%',
                                    paddingTop: '2%',
                                    fontSize: scaleFontSize(14),
                                    borderWidth: 1,
                                    borderColor: isNoidungLabel ? 'blue' : (isErrorNoidung ? 'red' : 'grey'),

                                }" />
                <nb-item v-if="isErrorNoidung"
                         :style="{
                            borderBottomWidth: 0,
                            height: viewScreen(5, 'vh'),
                            fontStyle: 'italic',
                            fontSize: scaleFontSize(8)
                         }"
                >
                    <nb-text class="text-danger"
                             :style="{
                                    fontStyle: 'italic',
                                    fontSize: scaleFontSize(10)
                             }"
                    >{{showErrorNoiDung}}</nb-text>
                </nb-item>
                <nb-button :on-press="takeSnapShop" class="mt-3" :style="{backgroundColor: '#3868D9'}"><nb-text>Chụp ảnh</nb-text></nb-button>
                <view v-if="getShowCamera">
                    <modal :transparent="true" :animationType="'slide'">
                        <camera-component :navigation="navigation"></camera-component>
                    </modal>
                </view>
                <nb-button full iconRight light :on-press="sendFeedback" class="button-bg mt-3" :style="{height: viewScreen(8, 'vh')}">
                    <nb-text class="button-feedback button-title" :style="{fontSize: scaleFontSize(14)}">GỬI ĐĂNG KÝ
                    </nb-text>
                    <nb-icon class="button-feedback button-icon" active name="arrow-forward"/>
                </nb-button>
            </nb-form>
        </view>
</template>
<script>
    import storeCamera from "../store/storeCamera";
    import {mapGetters, mapActions} from 'vuex';
    import LibCustom from '../library/custom';
    import axios from "axios";
    import React from "react";
    import {Picker, Icon} from "native-base";
    import qs from "qs";
    import CameraComponent from "./Camera.vue";
    const url_lay_ds_loai_dv = "http://ws.venuscorp.vn/WS_VENUSAPP/VenusCSKH/lay_ds_loaidichvu";
    const url_send_feedback = "http://ws.venuscorp.vn/WS_VENUSAPP/VenusCSKH/gui_phanAnhGopY";
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    };
    export default {
        props: {
            navigation: {
                type: Object
            }
        },
        data: function () {
            return {
                screen: {
                    width: 0,
                    height: 0,
                },
                isNameLabel: false,
                myName: '',
                isErrorMyName: false,
                showErrorMyName: '',

                isSDTLabel: false,
                sdt: '',
                isErrorSDT: false,
                showErrorSDT: '',

                listLoaiDV: null,
                defaultLoaiDV: '',

                isNoidungLabel: false,
                noidung: '',
                isErrorNoidung: false,
                showErrorNoiDung: '',

            };
        },
        created: function(){
            if(!this.$store._modulesNamespaceMap['storeCamera/']){
                this.$store.registerModule('storeCamera', storeCamera);
            }
        },
        components: {
            CameraComponent
        },
        computed: {
            getUserSelected: function(){
                return this.getIndexSelected();
            },
            getShowCamera: function(){
                return this.getShow();
            }
        },
        mounted: function () {
            this.screen = LibCustom.getSizeScreen();
            axios.post(url_lay_ds_loai_dv, config).then((response) => {
                this.listLoaiDV = response.data.data.danhmuc_loaidichvu;
                this.defaultLoaiDV = this.listLoaiDV[0].ma;
            }).catch(function (error) {
                console.log(error);
            })

        },
        methods: {
            ...mapGetters("login", ['getIndexSelected']),
            ...mapGetters("storeCamera", ['getShow']),
            ...mapActions("storeCamera", ["setShow"]),
            scaleFontSize: function (size) {
                return LibCustom.scaleFontSize(size);
            },
            viewScreen: function (percent, type, minus = 0) {
                return LibCustom.viewScreen(percent, type, minus);
            },
            handleFocusName: function () {
                this.isNameLabel = true;
                this.isErrorMyName = false;
                if (this.sdt === "") {
                    this.isSDTLabel = false;
                } else {
                    this.isSDTLabel = true;
                }
                if (this.noidung === "") {
                    this.isNoidungLabel = false;
                } else {
                    this.isNoidungLabel = true;
                }
            },
            handleChangeValueName: function () {
                if (this.myName === "") {
                    this.isNameLabel = false;
                } else {
                    this.isNameLabel = true;
                    this.isErrorMyName = false;
                    this.showErrorMyName = "";
                }
            },
            handleFocusSDT: function () {
                this.isSDTLabel = true;
                this.isErrorSDT = false;
                if (this.myName === "") {
                    this.isNameLabel = false;
                    this.isErrorMyName = true;
                    this.showErrorMyName = "Bạn vui lòng nhập vào tên người liên hệ";
                } else {
                    this.isNameLabel = true;
                }
                if (this.noidung === "") {
                    this.isNoidungLabel = false;
                } else {
                    this.isNoidungLabel = true;
                }

            },
            handleChangeValueSDT: function () {
                if (this.sdt === "") {
                    this.isSDTLabel = false;
                    this.isErrorSDT = false;
                    this.showErrorSDT = "";
                } else {
                    if (!this.sdt.match(/^[0-9]{1,}$/)){
                        this.isErrorSDT = true;
                        this.showErrorSDT = "Số điện thoại chỉ chứa số"
                    }else{
                        this.isErrorSDT = false;
                        this.showErrorSDT = "";
                    }
                    this.isSDTLabel = true;
                }
            },
            sendFeedback: function () {
                if(this.myName !== "" && this.sdt !== "" && this.noidung !== "" && !this.isErrorMyName && !this.isErrorSDT && !this.isErrorNoidung){
                    let data = {
                        "username": this.getUserSelected.username,
                        "id_taikhoan_chitiet": this.getUserSelected.id,
                        "ten_nguoiyeucau": this.myName,
                        "dienthoai_lienhe": this.sdt,
                        "dichvu": this.defaultLoaiDV,
                        "noidung": this.noidung,
                        "maChungThuc": LibCustom.ma_hoa(this.getUserSelected.username+this.getUserSelected.id+this.myName+this.sdt+this.defaultLoaiDV+this.noidung),
                    };
                    axios.post(url_send_feedback, qs.stringify(data), config).then((response) => {
                        console.log(response);
                        alert("gui thanh cong");
                    }).catch((error) => {

                    });
                }else{

                    if (this.myName === "") {
                        this.isErrorMyName = true;
                        this.showErrorMyName = "Bạn vui lòng nhập vào tên người liên hệ";
                    }
                    if (this.sdt === "") {
                        this.isErrorSDT = true;
                        this.showErrorSDT = "Bạn vui lòng nhập vào số điện thoại";
                    }
                    if(this.noidung === ""){
                        this.isErrorNoidung = true;
                        this.showErrorNoiDung = "Vui lòng nhập vào nội dung phản hồi góp ý";
                    }
                }
            },
            getIosIcon: function () {
                return <Icon name = "ios-arrow-down-outline" />;
            },
            handleFocusTextArea: function () {
                this.isNoidungLabel = true;
                this.isErrorNoidung = false;
                this.showErrorNoiDung = "";
                if (this.myName === "") {
                    this.isNameLabel = false;
                    this.isErrorMyName = true;
                    this.showErrorMyName = "Bạn vui lòng nhập vào tên người liên hệ";
                } else {
                    this.isNameLabel = true;
                }
                if (this.sdt === "") {
                    this.isSDTLabel = false;
                    this.isErrorSDT = true;
                    this.showErrorSDT = "Bạn vui lòng nhập vào số điện thoại";
                } else {
                    this.isSDTLabel = true;
                }

            },
            handleChangeValueNoiDung: function () {

            },
            onValueChange: function(value){
                this.defaultLoaiDV = value;
            },
            takeSnapShop: function(){
                this.setShow(true);
            }
        },
        beforeDestroy: function(){
            if(!this.$store._modulesNamespaceMap['storeCamera/']){
                this.$store.unregisterModule('storeCamera', storeCamera);
            }
        }
    }
</script>
<style>
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
        background-color: #3868D9;
        position: relative;
        height: 14%;
    }

    .button-title {
        position: absolute;
        left: 0;
    }

    .button-icon {
        position: absolute;
        right: 0;
    }
    .text-danger{
        color: red;
    }


</style>