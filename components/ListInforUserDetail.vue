<template>
    <view class="p-5percent" v-for="(todo, index) in dataUser" :key="todo.id">
        <nb-text class="text-bold" :style="{fontSize: scaleFontSize(20)}">Dự án: {{todo.ten_duan}}</nb-text>
        <nb-text class="text-bold text-id" :style="{fontSize: scaleFontSize(14)}">Mã : {{todo.ma_canho}}</nb-text>
        <nb-text :style="{fontSize: scaleFontSize(12)}">Địa chỉ: {{todo.diachi_duan}}</nb-text>
    </view>
</template>
<script>
    import LibCustom from '../library/custom';
    export default {
        props: {
            dataUser: {
                type: Array,
            }
        },
        data: function () {
            return {};
        },
        components: {},
        computed: {},
        mounted: function () {
            this.screen = LibCustom.getSizeScreen();
        },
        methods: {
            scaleFontSize: function (size) {
                return LibCustom.scaleFontSize(size);
            },
            viewScreen: function (percent, type, minus = 0) {
                return LibCustom.viewScreen(percent, type, minus);
            },
        }
    }
</script>
<style>
    .text-bold {
        font-weight: bold;
    }

    .text-id {
        color: orange;
    }
    .p-5percent{
        padding-left: 5%;
        padding-right: 5%;
        padding-top: 5%;
        padding-bottom: 5%;
    }

</style>