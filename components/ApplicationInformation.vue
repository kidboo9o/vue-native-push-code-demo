<template>
    <view>
        <view class="header"
              :style="{
                    width: viewScreen(100, 'vw'),
                    height: viewScreen(12, 'vh'),
                    borderColor: 'rgba(0,0,0,0.8)',
                    borderBottomWidth: 0.5
                }">
            <nb-text class="text-light">ỨNG DỤNG CHĂM SÓC KHÁCH HÀNG</nb-text>
        </view>
        <view class="col-2" v-for="(todo,index) in data" :key="todo.id"
              :style="{
                    borderColor: 'rgba(0,0,0,0.8)',
                    borderBottomWidth: 0.5
              }"
        >
            <nb-text>{{todo.title}}</nb-text>
            <nb-text>{{todo.noidung}}</nb-text>
        </view>
        <view class="body"></view>
    </view>
</template>
<script>
    import LibCustom from '../library/custom';
    export default {
        props: {},
        data: function () {
            return {
                screen: {
                    width: 0,
                    height: 0,
                },
                data: [
                    {id: 0, title: "Quyền sở hũu:", noidung: "Công ty Sao Kim"},
                    {id: 1, title: "Nhà phát triển:", noidung: "Venuscorp"},
                    {id: 2, title: "Email liên hệ:", noidung: "info@venuscorp.vn"},
                    {id: 3, title: "Phiên bản ứng dụng:", noidung: "1.2"},


                ]
            };
        },
        components: {

        },
        computed: {
        },
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
    .col-2{
        flex: 1;
        flex-direction: row;
        justify-content: space-between;
        padding-top: 20;
        padding-right: 20;
        padding-bottom: 20;
        margin-left: 20;
    }
</style>