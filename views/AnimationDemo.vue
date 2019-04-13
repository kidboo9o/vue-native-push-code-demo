<template>
    <view class="container">
       <image
               :source="src"
               :style="{
                   width: widthImage,
                   height: heightImage,
               }"
               :onLoaded="() => onImageLoaded(data)"
       ></image>
    </view>
</template>
<script>
    import posed from 'react-native-pose';
    import ResponsiveImage from 'react-native-responsive-image';
    import {Dimensions, Animated, Easing, Platform, Image} from 'react-native';
    export default {
        components: {
            ResponsiveImage
        },
        data: function () {
            return {
                widthImage: 100,
                heightImage: 100,
                src: {uri: "http://portal.venuscorp.vn/public/UNGDUNGCSKH/hinh_thongbao/no-image-icon.png"}
            };
        },
        mounted: function(){
            Image.getSize(this.src.uri, (srcWidth, srcHeight) => {
                console.log("do rong : "+srcWidth+" do cao : "+srcHeight);
            }, (error) => {
                console.log(error);
            })
        },
        methods: {

        }
    };
</script>
<style>
    .container {
        flex: 1;
        justify-content: center;
        align-items: center;
    }
</style>