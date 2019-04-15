<template>
    <nb-container>
        <view class="container">
            <AutoHeightImage
                    :source="require('../assets/images/bg.jpg')"
                    :width="screen.width"
                    :style="{flex: 1, resizeMode: 'stretch'}"
            ></AutoHeightImage>
            <view class="overlay t-20">
                <SpinnerEffectLottie :todo="todoLoadSuccess" v-if="getType"></SpinnerEffectLottie>
                <SpinnerEffectLottie :todo="todoLoadFailed" v-else></SpinnerEffectLottie>
            </view>
            <view v-if="getType" class="overlay t-35">
                <view class="text-center">
                    <nb-text class="text-light text-bold" :style="{fontSize: scaleFontSize(20)}">XIN CHÚC MỪNG!</nb-text>
                    <nb-text class="text-light" :style="{fontSize: scaleFontSize(14)}">Quý khách đã đăng kí thành công tài khoản.</nb-text>
                    <nb-text class="text-light" :style="{fontSize: scaleFontSize(14)}">Hãy đăng nhập để sử dụng dịch vụ</nb-text>
                    <nb-button :on-press="navigateLogin" :style="{marginLeft: '35%', marginTop: '5%', backgroundColor: 'white', zIndex: 99999}">
                        <nb-text class="text-success">Đăng Nhập</nb-text>
                    </nb-button>
                </view>
            </view>
            <view class="overlay t-35" v-else>
                <view class="text-center">
                    <nb-text class="text-light text-bold" :style="{fontSize: scaleFontSize(20)}">ĐĂNG KÍ KHÔNG THÀNH CÔNG!</nb-text>
                    <nb-text class="text-light" :style="{fontSize: scaleFontSize(14)}">{{navigation.state.params['description']}}</nb-text>
                </view>
            </view>
        </view>
    </nb-container>
</template>
<script>
    import LibCustom from '../library/custom';
    import AutoHeightImage from 'react-native-auto-height-image';
    import SpinnerEffectLottie from "../components/SpinnerEffectLottie.vue";
    export default {
        props: {
            navigation: {
                type: Object,
            }
        },
        data: function () {
            return {
                screen: {
                    width: 0,
                    height: 0,
                },
                isStatusSuccessLogin: false,
                isStatusFailedLogin: false,
                todoLoadSuccess: {
                    type: 'success1',
                    loop: false,
                    style: {
                        width: 100,
                        height: 100,
                    },
                    styleContainer: {
                        justifyContent: "flex-start",
                    }
                },
                todoLoadFailed: {
                    type: 'failed1',
                    loop: false,
                    style: {
                        width: 100,
                        height: 100,
                    },
                    styleContainer: {
                        justifyContent: "flex-start",
                    }
                },
            };
        },
        components: {
            AutoHeightImage,
            SpinnerEffectLottie
        },
        computed: {
            getType: function () {
                return this.navigation.getParam("type");
            },
            getDescription: function () {
                return this.navigation.getParam("description");
            }
        },
        mounted: function () {
            this.screen = LibCustom.getSizeScreen();
            if(this.navigation.getParam("type") === false){
                setTimeout(() => {
                    this.navigation.navigate("Register");
                },5000)
            }
        },
        methods: {
            scaleFontSize: function (size) {
                return LibCustom.scaleFontSize(size);
            },
            viewScreen: function (percent, type, minus = 0) {
                return LibCustom.viewScreen(percent, type, minus);
            },
            navigateLogin: function(){
                this.navigation.navigate("Login");
            }
        },

    }
</script>
<style>
    .container {
        flex: 1;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        position: relative;
    }

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .t-20{
        top: 20%;
    }
    .t-35{
        top: 35%;
    }
    .text-center{
        flex: 1;
        align-items: center;
    }
    .text-light{
        color: white;
    }
    .text-bold{
        font-weight: bold;
    }
    .text-success{
        color: #3868D9;
    }
</style>