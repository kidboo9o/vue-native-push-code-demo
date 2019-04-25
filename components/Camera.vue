<template>
    <view class="container">
        <view class="header">
            <nb-button transparent>
                <touchable-opacity :on-press="handleBack">
                    <nb-icon name="arrow-back" class="text-light"/>
                </touchable-opacity>
            </nb-button>
        </view>
        <view class="content" v-if="hasCameraPermission === null">
            <nb-text>Có lỗi phát sinh</nb-text>
        </view>
        <view class="content" v-else-if="hasCameraPermission === false">
            <nb-text>Bạn chưa cấp quyền truy cập vào camera</nb-text>
        </view>
        <view class="content" v-else-if="hasCameraPermission === true">
            <camera class="content" :type="type" ref="camera">
                <view class="content-end">
                    <view class="row bg-dark" :style="{height: viewScreen(15, 'vh'), width: viewScreen(100, 'vw')}">
                        <view class="col-3 offset-1" v-if="getImageCurrent === null">
                        </view>
                        <view class="col-3 offset-1 text-center" v-else>
                            <touchable-opacity :on-press="showListImage">
                                <image
                                        :source="getImageCurrent.src"
                                        :style="{resizeMode: 'cover', width: getImageCurrent.width, height: getImageCurrent.height}"
                                >
                                </image>
                            </touchable-opacity>

                        </view>
                        <view class="col-3 offset-1 text-center">
                                <touchable-opacity :on-press="takeSnapshop">
                                    <nb-icon name="camera" :style="{fontSize: scaleFontSize(60)}" class="text-light"
                                             type="MaterialIcons"/>
                                </touchable-opacity>
                        </view>
                        <view class="col-3 offset-1 text-center">
                                <touchable-opacity :on-press="handleClick">
                                    <nb-icon name="ios-reverse-camera" :style="{fontSize: scaleFontSize(40)}"
                                             class="text-light" type="Ionicons"/>
                                </touchable-opacity>
                        </view>
                    </view>

                </view>
            </camera>
        </view>
    </view>
</template>
<script>
    import {Camera, Permissions} from "expo";
    import LibCustom from '../library/custom';
    import {mapGetters, mapActions} from 'vuex';
    import DeckSwipeImageCamera from "./DeckSwipeImageCamera.vue";
    export default {
        props: {
            navigation: {
                type: Object
            }
        },
        data: function () {
            return {
                hasCameraPermission: null,
                type: Camera.Constants.Type.back,
                textConstants: 'Mặt sau',
                screen: {
                    width: 0,
                    height: 0,
                },
                imageCurrent: null,
            };
        },
        mounted: function () {
            this.screen = LibCustom.getSizeScreen();
            Permissions.askAsync(Permissions.CAMERA)
                .then(status => {
                    if (status.status == "granted") {
                        this.hasCameraPermission = true;
                    } else {
                        this.hasCameraPermission = false;
                    }
                }).catch((err) => {
                console.log(err);
            });
        },
        computed: {
            getImageCurrent: function () {
                if(this.getListImage().length > 0 ){
                    this.imageCurrent = this.getListImage()[this.getListImage().length-1];
                    let temp = this.imageCurrent.width / this.imageCurrent.height;
                    this.imageCurrent.height = LibCustom.viewScreen(10, 'vh');
                    this.imageCurrent.width = this.imageCurrent.height / temp;
                }
                return this.imageCurrent;

            },
        },
        methods: {
            ...mapGetters("storeCamera", ['getListImage']),
            ...mapActions("storeCamera", ["setShow", "setAddImage"]),
            scaleFontSize: function (size) {
                return LibCustom.scaleFontSize(size);
            },
            viewScreen: function (percent, type, minus = 0) {
                return LibCustom.viewScreen(percent, type, minus);
            },
            handleClick: function () {
                if (this.type === Camera.Constants.Type.back) {
                    this.type = Camera.Constants.Type.front;
                    this.textConstants = 'Mặt trước';
                } else {
                    this.type = Camera.Constants.Type.back;
                    this.textConstants = 'Mặt sau';
                }
            },
            handleCamera: function (ref) {
                this.camera = ref;
            },
            takeSnapshop: function () {
                this.$refs.camera.takePictureAsync({skipProcessing: true}).then((data) => {
                    const image = {
                        src: {
                            uri: data.uri,
                        },
                        width: data.width,
                        height: data.height,
                    };
                    this.setAddImage(image);
                });
            },
            handleBack: function () {
                this.setShow(false);
            },
            showListImage: function(){
                this.navigation.navigate("DeckSwipeImageCamera");
            }
        },
        components: {Camera, DeckSwipeImageCamera},
    };
</script>
<style>
    .container {
        flex: 1;
        margin-top: 24;
    }

    .header {
        flex: 0.1;
        justify-content: flex-start;
        background-color: black;
    }

    .content {
        flex: 1;
    }

    .content-end {
        flex: 1;
        justify-content: flex-end;
    }

    .row {
        flex-direction: row;
        justify-content: center;
    }


    .col-3 {
        width: 25%;
    }

    .offset-1 {
        margin-left: 8.333333%;
    }

    .text-light {
        color: white;
    }

    .bg-dark {
        background-color: black;
    }
    .text-center{
        justify-content: center;
        align-items: center;
    }
</style>