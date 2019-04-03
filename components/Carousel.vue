<template>
    <view :style="{flex: 1, height: heightContainer}">
            <Swiper autoplay
                    :activeDotColor="'#fff'"
                    :dotStyle="{marginBottom: '6%'}"
                    :activeDotStyle="{marginBottom: '6%'}"
                    :style="{marginBottom: '6%'}"
            >
                <view class="slide" v-for="todo in slideImages" :key="todo.id">
                    <AutoHeightImage
                            :source="todo.src"
                            :width="viewScreen(100, 'vw')"
                            :style="{resizeMode: 'cover'}"
                    >
                    </AutoHeightImage>

                </view>
            </Swiper>
    </view>

</template>
<script>
    import LibCustom from '../library/custom';
    import React, {Component} from 'react';
    import Swiper from 'react-native-swiper';
    import AutoHeightImage from 'react-native-auto-height-image';
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
                heightContainer: 0,
                slideImages: [
                    {
                        id: 0,
                        src: require('../assets/images/img-01.jpg'),
                    },
                    {
                        id: 1,
                        src: require('../assets/images/img-02.jpg'),
                    },
                    {
                        id: 2,
                        src: require('../assets/images/img-03.jpg'),
                    }
                ]
            };
        },
        components: {
            Swiper,
            AutoHeightImage,
        },
        created: function(){

        },
        computed: {},
        mounted: function () {
            this.screen = LibCustom.getSizeScreen();
            let image = LibCustom.getSizeImage(this.slideImages[0].src);
            let temp = image.width/image.height;
            this.heightContainer = this.screen.width/temp;
            this.heightContainer += this.heightContainer*0.14;
        },
        methods: {
            scaleFontSize: function (size) {
                return LibCustom.scaleFontSize(size);
            },
            viewScreen: function (percent, type, minus = 0) {
                return LibCustom.viewScreen(percent, type, minus);
            },

        },


    };
</script>
<style>
    .slide {
        flex: 1;
        justify-content: center;
        align-items: center;
    }
</style>