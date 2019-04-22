<template>
    <view class="changepassword">
        <view v-if="isStatusSuccessLogin || isStatusFailedLogin">
            <modal :transparent="true" :animationType="'fade'">
                <SpinnerEffectLottie :todo="todoLoadSuccess" v-if="isStatusSuccessLogin"></SpinnerEffectLottie>
                <SpinnerEffectLottie :todo="todoLoadFailed" v-if="isStatusFailedLogin"></SpinnerEffectLottie>
            </modal>
        </view>


        <nb-form>
            <nb-item :class="{'mb-20': !isErrorOldPassword}"
                     :style="{
                        borderBottomWidth: 1,
                        borderTopWidth: 1,
                        borderLeftWidth: 1,
                        borderRightWidth: 1,
                        borderColor: isErrorOldPassword ? 'red' : 'rgba(0,0,0,0.2)',
                        backgroundColor: 'white',
                        height: viewScreen(8, 'vh'),
                        position: 'relative',

                     }"
            >
                <nb-label class="form-label">Mật khẩu cũ</nb-label>
                <nb-input class="w-80 form-input"
                          :on-focus="handleFocusOldPassword" auto-capitalize="none"
                          :secure-text-entry="isHiddenOldPassword" v-model="oldPassword"
                          :on-change-text="handleChangeValueOldPassword"
                />
                <nb-icon v-if="isErrorOldPassword" class="form-icon text-danger" name="close-circle"
                         type="MaterialCommunityIcons"/>
                <nb-icon v-if="isHiddenOldPassword && !isErrorOldPassword" type="Feather" class="form-icon"
                         name="eye-off" :on-press="showOldPassword"/>
                <nb-icon v-if="!isHiddenOldPassword && !isErrorOldPassword" type="Feather" class="form-icon" name="eye"
                         :on-press="showOldPassword"/>
            </nb-item>
            <nb-item v-if="isErrorOldPassword" class="mb-20"
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
                >{{showTextErrorOldPassword}}</nb-text>
            </nb-item>
            <nb-item :class="{'mb-20': !isErrorNewPassword}"
                     :style="{
                        borderBottomWidth: 1,
                        borderTopWidth: 1,
                        borderLeftWidth: 1,
                        borderRightWidth: 1,
                        borderColor: isErrorNewPassword ? 'red' : 'rgba(0,0,0,0.2)',
                        backgroundColor: 'white',
                        height: viewScreen(8, 'vh'),
                        position: 'relative',

                     }"
            >
                <nb-label class="form-label">Mật khẩu mới</nb-label>
                <nb-input class="w-80 form-input"
                          :on-focus="handleFocusNewPassword" auto-capitalize="none"
                          :secure-text-entry="isHiddenNewPassword" v-model="newPasswordd"
                          :on-change-text="handleChangeValueNewPassword"
                ></nb-input>
                <nb-icon v-if="isErrorNewPassword" class="form-icon text-danger" name="close-circle"
                         type="MaterialCommunityIcons"/>
                <nb-icon v-if="isHiddenNewPassword && !isErrorNewPassword" type="Feather" class="form-icon"
                         name="eye-off" :on-press="showNewPassword"/>
                <nb-icon v-if="!isHiddenNewPassword && !isErrorNewPassword" type="Feather" class="form-icon" name="eye"
                         :on-press="showNewPassword"/>
            </nb-item>
            <nb-item v-if="isErrorNewPassword" class="mb-20"
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
                >{{showTextErrorNewPassword}}</nb-text>
            </nb-item>

            <nb-item :class="{'mb-20': !isErrorRepeatNewPassword}"
                     :style="{
                        borderBottomWidth: 1,
                        borderTopWidth: 1,
                        borderLeftWidth: 1,
                        borderRightWidth: 1,
                        borderColor: isErrorRepeatNewPassword ? 'red' : 'rgba(0,0,0,0.2)',
                        backgroundColor: 'white',
                        height: viewScreen(8, 'vh'),
                        position: 'relative',

                     }"
            >
                <nb-label class="form-label">Nhập lại mật khẩu mới</nb-label>
                <nb-input class="w-80 form-input"
                          :on-focus="handleFocusRepeatNewPassword" auto-capitalize="none"
                          :secure-text-entry="isHiddenRepeatNewPassword" v-model="repeatNewPassword"
                          :on-change-text="handleChangeValueRepeatNewPassword"
                ></nb-input>
                <nb-icon v-if="isErrorRepeatNewPassword" class="form-icon text-danger" name="close-circle"
                         type="MaterialCommunityIcons"/>
                <nb-icon v-if="isHiddenRepeatNewPassword && !isErrorRepeatNewPassword" type="Feather" class="form-icon"
                         name="eye-off" :on-press="showRepeatNewPassword"/>
                <nb-icon v-if="!isHiddenRepeatNewPassword && !isErrorRepeatNewPassword" type="Feather" class="form-icon"
                         name="eye" :on-press="showRepeatNewPassword"/>
            </nb-item>
            <nb-item v-if="isErrorRepeatNewPassword" class="mb-20"
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
                >{{showTextErrorRepeatNewPassword}}</nb-text>
            </nb-item>

            <nb-button iconRight full :style="{height: viewScreen(8, 'vh'), marginLeft: '5%'}"
                       :on-press="sendChangePassword">
                <nb-text class="text-left">ĐỖI MẬT KHẨU</nb-text>
                <nb-icon class="text-right" active name="arrow-forward"/>
            </nb-button>

        </nb-form>
    </view>
</template>
<script>
    import LibCustom from '../library/custom';
    import SpinnerEffectLottie from "../components/SpinnerEffectLottie.vue";
    import axios from "axios";
    import qs from "qs";
    import {mapGetters, mapActions} from 'vuex';
    const url_change_password = "http://ws.venuscorp.vn/WS_VENUSAPP/VenusCSKH/doimatkhau";
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
                isHiddenOldPassword: true,
                oldPassword: '',
                isErrorOldPassword: false,
                showTextErrorOldPassword: '',

                isHiddenNewPassword: true,
                newPasswordd: '',
                isErrorNewPassword: false,
                showTextErrorNewPassword: '',

                isHiddenRepeatNewPassword: true,
                repeatNewPassword: '',
                isErrorRepeatNewPassword: false,
                showTextErrorRepeatNewPassword: '',

                isStatusSuccessLogin: false,
                isStatusFailedLogin: false,
                todoLoadSuccess: {
                    type: 'success1',
                    bgColor: 'rgba(0,0,0,0.4)',
                    loop: false,
                    style: {
                        width: 100,
                        height: 100,
                    }
                },
                todoLoadFailed: {
                    type: 'failed1',
                    bgColor: 'rgba(0,0,0,0.4)',
                    loop: false,
                    style: {
                        width: 100,
                        height: 100,
                    }
                },
            };
        },
        components: {
            SpinnerEffectLottie
        },
        computed: {},
        mounted: function () {
            this.screen = LibCustom.getSizeScreen();
        },
        methods: {
            ...mapGetters("login", ['getUserName']),
            ...mapActions("screenBaseOnFooter", ['setScreen']),
            scaleFontSize: function (size) {
                return LibCustom.scaleFontSize(size);
            },
            viewScreen: function (percent, type, minus = 0) {
                return LibCustom.viewScreen(percent, type, minus);
            },
            handleFocusOldPassword: function () {
                this.isErrorOldPassword = false;
                this.showTextErrorOldPassword = "";
            },
            handleChangeValueOldPassword: function () {

            },
            handleFocusNewPassword: function () {
                this.isErrorNewPassword = false;
                this.showTextErrorNewPassword = "";
                if (this.oldPassword === "") {
                    this.isErrorOldPassword = true;
                    this.showTextErrorOldPassword = "Bạn vui lòng nhập vào mật khẩu cũ.";
                }

            },
            handleChangeValueNewPassword: function () {

            },
            handleFocusRepeatNewPassword: function () {
                this.isErrorRepeatNewPassword = false;
                this.showTextErrorRepeatNewPassword = "";
                if (this.oldPassword === "") {
                    this.isErrorOldPassword = true;
                    this.showTextErrorOldPassword = "Bạn vui lòng nhập vào mật khẩu cũ.";
                }
                if (this.newPasswordd === "") {
                    this.isErrorNewPassword = true;
                    this.showTextErrorNewPassword = "Bạn vui lòng nhập vào mật khẩu mới."
                }

            },
            handleChangeValueRepeatNewPassword: function () {

            },
            showOldPassword: function () {
                this.isHiddenOldPassword = !this.isHiddenOldPassword;
            },
            showNewPassword: function () {
                this.isHiddenNewPassword = !this.isHiddenNewPassword;
            },
            showRepeatNewPassword: function () {
                this.isHiddenRepeatNewPassword = !this.isHiddenRepeatNewPassword;
            },
            sendChangePassword: function () {
                if (this.oldPassword !== "" && this.newPasswordd !== "" && this.repeatNewPassword !== "" && !this.isErrorOldPassword && !this.isErrorNewPassword && !this.isErrorRepeatNewPassword) {
                    console.log("in ra password new : " + this.newPasswordd);
                    console.log("in ra repeat password : " + this.repeatNewPassword);
                    if (this.repeatNewPassword !== this.newPasswordd) {
                        this.isErrorRepeatNewPassword = true;
                        this.showTextErrorRepeatNewPassword = "Mật khẩu mới nhập lại chưa chính xác."
                    } else {
                        let username = this.getUserName();
                        let data = {
                            "taiKhoan": username,
                            "matKhauCu": this.oldPassword,
                            "matKhauMoi": this.repeatNewPassword,
                            "maChungThuc": LibCustom.ma_hoa(username + this.oldPassword + this.repeatNewPassword),
                        }
                        axios.post(url_change_password, qs.stringify(data), config).then((response) => {
                            console.log(response);
                            if (response.data.code === "1") {
                                //success
                                this.isStatusSuccessLogin = true;
                                setTimeout(() => {
                                    this.isStatusSuccessLogin = false;
                                    this.setScreen("Home");
                                }, 1000)
                            } else {
                                this.isStatusFailedLogin = true;
                                setTimeout(() => {
                                    this.isStatusFailedLogin = false;
                                    this.isErrorOldPassword = true;
                                    this.showTextErrorOldPassword = response.data.description;
                                }, 1000);
                            }
                        }).catch((error) => {

                        });
                    }
                }else{
                    if (this.oldPassword === "") {
                        this.isErrorOldPassword = true;
                        this.showTextErrorOldPassword = "Bạn vui lòng nhập vào mật khẩu cũ.";
                    }
                    if (this.newPasswordd === "") {
                        this.isErrorNewPassword = true;
                        this.showTextErrorNewPassword = "Bạn vui lòng nhập vào mật khẩu mới."
                    }
                    if (this.repeatNewPassword === "") {
                        this.isErrorRepeatNewPassword = true;
                        this.showTextErrorRepeatNewPassword = "Bạn vui lòng nhập vào mật khẩu mới."
                    }
                }
            }
        }
    }
</script>
<style>
    .changepassword {
        width: 100%;
        padding-left: 10%;
        padding-right: 10%;
        padding-top: 20%;
        padding-bottom: 20%;
    }

    .px-20 {
        padding-left: 20;
        padding-right: 20;
    }

    .w-80 {
        width: 80%;
    }

    .mb-20 {
        margin-bottom: 20;
    }

    .mx-20 {
        margin-left: 20;
        margin-right: 20;
    }

    .text-left {
        position: absolute;
        left: 0;
    }

    .text-right {
        position: absolute;
        right: 0;
    }

    .form-label {
        position: absolute;
        top: 5%;
        left: 20;
    }

    .form-input {
        position: absolute;
        top: 20%;
        left: 20;
    }

    .form-icon {
        position: absolute;
        right: 0;
    }

    .text-danger {
        color: red;
    }

</style>