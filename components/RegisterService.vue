<template>
    <view class="container">
        <view v-if="getShowModal">
            <modal :transparent="true" :animationType="'slide'">
                <view class="modal">
                    <nb-text class="text-bold text-light2 px-15" :style="{fontSize: scaleFontSize(25)}">Chức Năng Đang Phát Triển</nb-text>
                </view>
                <SpinnerEffectLottie :todo="loadGuide"></SpinnerEffectLottie>
            </modal>
        </view>
        <view class="header"
              :style="{
                    width: viewScreen(100, 'vw'),
                    height: viewScreen(12, 'vh'),
                    borderColor: 'rgba(0,0,0,0.8)',
                    borderBottomWidth: 0.5
                }">
            <nb-text class="text-light">TÙY CHỌN THỜI GIAN(Tháng/Năm) </nb-text>
        </view>
        <view :style="{
             width: viewScreen(80, 'vw'),
             height: viewScreen(200, 'vh'),
        }">
            <nb-form>
                <nb-item regular class="mt-3 item"
                         :style="{
                                  borderColor: isNameLabel ? 'blue' : (isErrorMyName ? 'red' : 'grey'),
                                  height: viewScreen(8, 'vh'),
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
                <nb-item v-if="isErrorMyName" class="mt-3"
                         :style="{
                            borderBottomWidth: 0,
                            height: viewScreen(5, 'vh'),
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
                                  height: viewScreen(8, 'vh'),
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
                <nb-item v-if="isErrorSDT" class="mt-3"
                         :style="{
                            borderBottomWidth: 0,
                            height: viewScreen(5, 'vh'),
                         }"
                >
                    <nb-text class="text-danger"
                             :style="{
                                    fontStyle: 'italic',
                                    fontSize: scaleFontSize(10)
                             }"
                    >{{showErrorSDT}}</nb-text>
                </nb-item>

                <nb-item regular class="mt-3 item"
                         :style="{
                                  borderColor: isErrorDate ? 'red' : (isDateLabel ? 'blue' : 'grey'),
                                  height: viewScreen(8, 'vh'),
                         }"
                >
                    <nb-label
                            :style="{
                                position: 'absolute',
                                top: isDateLabel ? 0 : '30%',
                                left: 20,
                                fontSize: isDateLabel ? scaleFontSize(9) : scaleFontSize(14),
                                color: isDateLabel ? 'blue' : 'grey',
                            }"
                    >Chọn ngày đăng kí
                    </nb-label>
                    <nb-input v-model="getDateFunc" :on-focus="handleFocusDate"
                              :style="{
                                 position: 'absolute',
                                 bottom: 0,
                                 left: 20,
                                 width: '80%',
                                 fontSize: scaleFontSize(14),
                            }"
                    ></nb-input>
                    <nb-icon type="EvilIcons" name="calendar"
                             :style="{
                                position: 'absolute',
                                right: 0,
                            }"
                    ></nb-icon>
                </nb-item>
                <view v-if="isShowCalendarDate && isDateLabel">
                    <modal :transparent="true" :animationType="'slide'">
                        <select-date></select-date>
                    </modal>
                </view>

                <nb-item v-if="isErrorDate" class="mt-3"
                         :style="{
                            borderBottomWidth: 0,
                            height: viewScreen(5, 'vh'),
                         }"
                >
                    <nb-text class="text-danger"
                             :style="{
                                    fontStyle: 'italic',
                                    fontSize: scaleFontSize(10)
                             }"
                    >{{showErrorDate}}</nb-text>
                </nb-item>

                <nb-item regular class="mt-3 item"
                         :style="{
                                  borderColor: isErrorDateTime ? 'red' : (isDateTimeLabel ? 'blue' : 'grey'),
                                  height: viewScreen(8, 'vh'),
                         }"
                >
                    <nb-label
                            :style="{
                                position: 'absolute',
                                top: isDateTimeLabel ? 0 : '30%',
                                left: 20,
                                fontSize: isDateTimeLabel ? scaleFontSize(9) : scaleFontSize(14),
                                color: isDateTimeLabel ? 'blue' : 'grey',
                            }"
                    >Chọn giờ đăng kí
                    </nb-label>
                    <nb-input v-model="getDateTimeFunc" :on-focus="handleFocusDateTime"
                              :style="{
                                 position: 'absolute',
                                 bottom: 0,
                                 left: 20,
                                 width: '80%',
                                 fontSize: scaleFontSize(14),
                            }"
                    ></nb-input>
                    <nb-icon type="Ionicons" name="md-clock"
                             :style="{
                                position: 'absolute',
                                right: 0,
                            }"
                    ></nb-icon>
                </nb-item>
                <view v-if="isShowCalendarDateTime && isDateTimeLabel">
                        <select-date-time></select-date-time>
                </view>

                <nb-item v-if="isErrorDateTime" class="mt-3"
                         :style="{
                            borderBottomWidth: 0,
                            height: viewScreen(5, 'vh'),
                         }"
                >
                    <nb-text class="text-danger"
                             :style="{
                                    fontStyle: 'italic',
                                    fontSize: scaleFontSize(10)
                             }"
                    >{{showErrorDateTime}}</nb-text>
                </nb-item>



                <nb-item picker regular class="mt-3 pl-3 item"
                         :style="{
                            borderColor: 'grey',
                            height: viewScreen(8, 'vh'),
                        }">
                    <nb-picker
                            mode="dropdown"
                            :iosIcon="getIosIcon()"
                            :style="{ width: '100%' }"
                            :placeholder="'Loại dịch vụ'"
                            placeholderStyle="{ color: '#bfc6ea' }"
                            placeholderIconColor="#007aff"
                            :selectedValue="defaultLoaiDV"
                            :onValueChange="onValueChange"
                    >
                        <item label="Hồ bơi" value="key0"></item>
                        <item label="Phòng sinh hoạt cộng đồng" value="key1"></item>
                        <item label="Sân golf" value="key2"></item>
                        <item label="Sân tennis" value="key3"></item>

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
                <nb-item v-if="isErrorNoidung" class="mt-3"
                         :style="{
                            borderBottomWidth: 0,
                            height: viewScreen(5, 'vh'),
                         }"
                >
                    <nb-text class="text-danger"
                             :style="{
                                    fontStyle: 'italic',
                                    fontSize: scaleFontSize(10)
                             }"
                    >{{showErrorNoiDung}}</nb-text>
                </nb-item>
                <nb-button full iconRight light :on-press="sendFeedback" class="button-bg mt-3"
                           :style="{height: viewScreen(8, 'vh'),}"
                >
                    <nb-text class="button-feedback button-title" :style="{fontSize: scaleFontSize(14)}">GỬI ĐĂNG KÝ
                    </nb-text>
                    <nb-icon class="button-feedback button-icon" active name="arrow-forward"/>
                </nb-button>


            </nb-form>
        </view>
    </view>
</template>
<script>
    import LibCustom from '../library/custom';
    import axios from "axios";
    import qs from "qs";
    import React from "react";
    import {Picker, Icon} from "native-base";
    import {mapGetters, mapActions} from 'vuex';
    import SpinnerEffectLottie from "../components/SpinnerEffectLottie.vue";
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    };
    import SelectDate from "./SelectDate.vue";
    import SelectDateTime from "./SelectDateTime.vue";
    export default {
        props: {},
        data: function () {
            return {
                isShowModal: false,
                loadGuide: {
                    type: 'maintaince1',
                    bgColor: 'rgba(0,0,0,0.8)',
                    loop: true,
                    style: {
                        width: 300,
                        height: 300,
                    },

                },
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

                isDateLabel: false,
                isErrorDate: false,
                showErrorDate: '',

                isDateTimeLabel: false,
                isErrorDateTime: false,
                showErrorDateTime: '',

            };
        },
        components: {
            SelectDate,
            SelectDateTime,
            SpinnerEffectLottie
        },
        computed: {
            getShowModal: function(){
              return this.isShowModal;
            },
            isShowCalendarDate: function(){
                return this.getShowDate();
            },
            getDateFunc: function(){
                return this.getDate();
            },
            isShowCalendarDateTime: function(){
                return this.getShowDateTime();
            },
            getDateTimeFunc: function(){
                return this.getTime();
            }

        },
        mounted: function () {
            this.screen = LibCustom.getSizeScreen();
        },
        methods: {
            ...mapGetters("getDate", ["getShowDate", "getShowDateTime", "getDate", "getTime"]),
            ...mapActions("getDate", ["setShowDate", "setShowDateTime", "setDate", "setTime"]),
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
                if(this.getDateFunc === ""){
                    this.isDateLabel = false;
                }else{
                    this.isDateLabel = true;
                }
                if(this.getDateTimeFunc === ""){
                    this.isDateTimeLabel = false;
                }else{
                    this.isDateTimeLabel = true;
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
                if(this.getDateFunc === ""){
                    this.isDateLabel = false;
                }else{
                    this.isDateLabel = true;
                }
                if(this.getDateTimeFunc === ""){
                    this.isDateTimeLabel = false;
                }else{
                    this.isDateTimeLabel = true;
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
                if(this.myName !== "" && this.sdt !== "" && this.noidung !== "" && this.getDateFunc !== "" && this.getDateTimeFunc !== "" && !this.isErrorMyName && !this.isErrorSDT && !this.isErrorNoidung && !this.isErrorDate && !this.isErrorDateTime){
                    this.isShowModal = true;
                    setTimeout( () => {
                        this.isShowModal = false;
                    },4000);
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
                    if(this.getDateFunc === ""){
                        this.isErrorDate = true;
                        this.showErrorDate = "Bạn vui lòng chọn ngày đăng kí dịch vụ.";
                    }
                    if(this.getDateTimeFunc === "") {
                        this.isErrorDateTime = true;
                        this.showErrorDateTime = "Bạn vui lòng chọn giờ đăng kí dịch vụ.";
                    }
                }
            },
            getIosIcon: function () {
                return <Icon name = "ios-arrow-down-outline" />;
            },
            handleFocusTextArea: function () {
                this.isNoidungLabel = true;
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
                if(this.getDateFunc === ""){
                    this.isDateLabel = false;
                    this.isErrorDate = true;
                    this.showErrorDate = "Bạn vui lòng chọn ngày đăng kí dịch vụ.";
                }else{
                    this.isDateLabel = true;
                }
                if(this.getDateTimeFunc === ""){
                    this.isDateTimeLabel = false;
                    this.isErrorDateTime = true;
                    this.showErrorDateTime = "Bạn vui lòng chọn giờ đăng kí dịch vụ.";
                }else{
                    this.isDateTimeLabel = true;
                }

            },
            handleChangeValueNoiDung: function () {

            },

            onValueChange: function(value){
                this.defaultLoaiDV = value;
            },
            handleFocusDate: function(){
                this.isDateLabel = true;
                this.setShowDate(true);
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
                if (this.noidung === "") {
                    this.isNoidungLabel = false;
                } else {
                    this.isNoidungLabel = true;
                }
                if(this.getDateTimeFunc === ""){
                    this.isDateTimeLabel = false;
                }else{
                    this.isDateTimeLabel = true;
                }
            },
            handleFocusDateTime: function(){
                this.isDateTimeLabel = true;
                this.setShowDateTime(true);
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
                if (this.noidung === "") {
                    this.isNoidungLabel = false;
                } else {
                    this.isNoidungLabel = true;
                }
                if(this.getDateFunc === ""){
                    this.isDateLabel = false;
                    this.isErrorDate = true;
                    this.showErrorDate = "Bạn vui lòng chọn ngày đăng kí dịch vụ.";
                }else{
                    this.isDateLabel = true;
                }
            }
        },
        beforeDestroy: function(){
            this.setDate('');
            this.setTime('');
        }
    }
</script>
<style>
    .container{
        flex: 1;
        justify-content: center;
        align-items: center;
    }
    .header{
        background-color: rgba(0,0,0,0.08);
        flex: 1;
        justify-content: flex-end;
        padding-left: 20;
        padding-right: 20;
        padding-bottom: 10;
    }
    .text-light{
        color: rgba(0,0,0,0.4);
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

    .modal{
        flex: 0.7;
        align-items: center;
        justify-content: center;
        z-index: 99999;
    }
    .text-bold{
        font-weight: bold;
    }
    .text-light2{
        color: white;
    }
    .px-15{
        padding-left: 15%;
        padding-right: 15%;
    }

</style>