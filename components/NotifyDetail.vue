<template>
    <view class="container px-10">
        <nb-text class="text-danger text-bold py-10" :style="{fontSize: scaleFontSize(20)}">{{todo.data.title}}</nb-text>
        <AutoHeightImage
                class="py-10"
                :source="todo.image.src"
                :width="viewScreen(80, 'vw')"
                :style="{flex: 1, resizeMode: 'stretch'}"
        ></AutoHeightImage>
        <nb-text class="py-10">{{todo.data.description}}</nb-text>

    </view>
</template>
<script>
    import LibCustom from '../library/custom';
    import AutoHeightImage from 'react-native-auto-height-image';
    export default {
        props: {
            navigation: {
                type: Object
            },
            todo: {
                type: Object,
            }
        },
        data: function () {
            return {
                screen: {
                    width: 0,
                    height: 0,
                },
            };
        },
        created: function () {
            this.screen = LibCustom.getSizeScreen();
            console.log("in ra thu todo xem sao ");
            console.log(this.todo);

        },
        components: {
            AutoHeightImage
        },
        computed: {
        },
        mounted: function () {

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
    .container{
        flex: 1;
        justify-content: center;
        align-items: center;
    }
    .py-10{
        padding-top: 10%;
        padding-bottom: 10%;
    }
    .px-10{
        padding-left: 10%;
        padding-right: 10%;
    }
    .text-danger{
        color: red;
    }
    .text-bold{
        font-weight: bold;
    }
</style>