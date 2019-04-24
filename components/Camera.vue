<template>
    <view class="container">
        <view class="content" v-if="hasCameraPermission === null">
            <nb-text>Có lỗi phát sinh</nb-text>
        </view>
        <view class="content" v-else-if="hasCameraPermission === false">
            <nb-text>Bạn chưa cấp quyền truy cập vào camera</nb-text>
        </view>
        <view class="content" v-else-if="hasCameraPermission === true">
            <camera class="content" :type="type" ref="camera">
                <view class="content-end">

                    <view class="row w-10">
                        <view class="col-3 offset-1">
                            <nb-button :on-press="handleBack">
                                <nb-text :style="{color: 'white', fontSize: scaleFontSize(10)}">Quay lại</nb-text>
                            </nb-button>
                        </view>
                        <view class="col-3 offset-1">
                            <nb-button :on-press="takeSnapshop">
                                <nb-text :style="{color: 'white', fontSize: scaleFontSize(10)}">Chụp hình</nb-text>
                            </nb-button>
                        </view>
                        <view class="col-3 offset-1">
                            <nb-button :on-press="handleClick">
                                <nb-text :style="{color: 'white', fontSize: scaleFontSize(10)}">{{textConstants}}</nb-text>
                            </nb-button>
                        </view>
                    </view>

                </view>
            </camera>
        </view>
    </view>
</template>
<script>
    import { Camera, Permissions } from "expo";
    import LibCustom from '../library/custom';
    import {mapGetters, mapActions} from 'vuex';
    export default {
        props: {
            navigation: {
                type: Object
            }
        },
        data: function() {
            return {
                hasCameraPermission: null,
                type: Camera.Constants.Type.back,
                textConstants: 'Mặt sau',
                screen: {
                    width: 0,
                    height: 0,
                },
            };
        },
        mounted: function() {
            this.screen = LibCustom.getSizeScreen();
            Permissions.askAsync(Permissions.CAMERA)
                .then(status => {
                    if(status.status == "granted"){
                        this.hasCameraPermission = true;
                    }else{
                        this.hasCameraPermission = false;
                    }
                }).catch((err)=>{
                console.log(err);
            });
        },
        methods: {
            ...mapActions("storeCamera", ["setShow"]),
            scaleFontSize: function (size) {
                return LibCustom.scaleFontSize(size);
            },
            viewScreen: function (percent, type, minus = 0) {
                return LibCustom.viewScreen(percent, type, minus);
            },
            handleClick: function(){
                if(this.type === Camera.Constants.Type.back){
                    this.type = Camera.Constants.Type.front;
                    this.textConstants = 'Mặt trước';
                }else{
                    this.type = Camera.Constants.Type.back;
                    this.textConstants = 'Mặt sau';
                }
            },
            handleCamera: function(ref){
                this.camera = ref;
            },
            takeSnapshop: function(){
                this.$refs.camera.takePictureAsync({skipProcessing: true}).then((data) => {
                    console.log("in ra sau khi chup hinh : ");
                    console.log(data);
                });
            },
            handleBack: function(){
                this.setShow(false);
            }
        },
        components: { Camera },
    };
</script>
<style>
    .container {
        flex: 1;
    }
    .content{
        flex: 1;
    }
    .content-end{
        flex: 1;
        justify-content: flex-end;
    }
    .row{
        flex-direction: row;
    }
    .w-10{
        flex: 0.1;
    }
    .col-5{
        width: 41.666667%;
    }
    .col-3{
        width: 25%;
    }
    .offset-1{
        margin-left: 8.333333%;
    }
    .text-color-primary {
        color: blue;
    }
</style>