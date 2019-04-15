<template>
    <view class="container">
        <image
                :source="require('../assets/images/img-01.jpg')"
                :style="{
                    width: 200,
                    height: 200
                }"
        >

        </image>
    </view>
</template>
<script>
    import axios from "axios";
    import { FileSystem } from 'expo';
    import image1 from "../assets/images/img-01.jpg";
    export default {
        components: {},
        data: function () {
            return {};
        },
        mounted: function () {
            console.log("in ra thử xem : ");
            console.log(image1);
        },
        methods: {}
    };
</script>
<style>
    .container {
        flex: 1;
        justify-content: center;
        align-items: center;
    }
</style>