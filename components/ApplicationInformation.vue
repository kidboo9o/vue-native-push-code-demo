<template>
    <view :style="{width: viewScreen(100, 'vw')}">
        <view class="header"
              :style="{
                    width: viewScreen(100, 'vw'),
                    height: viewScreen(12, 'vh'),
                    borderColor: 'rgba(0,0,0,0.8)',
                    borderBottomWidth: 0.5
                }">
            <nb-text class="text-light">{{getListData.title}}</nb-text>
        </view>
        <view class="row" v-for="(todo,index) in getListData.tableData" :key="todo.id"
              :style="{
                    borderColor: 'rgba(0,0,0,0.8)',
                    borderBottomWidth: 0.5,

              }"
        >
            <nb-text v-if="lastIndex === index" :style="objApplicationInformation.styleTextRowLast">{{todo.title}}</nb-text>
            <nb-text v-else>{{todo.title}}</nb-text>
            <nb-text v-if="lastIndex === index" :style="objApplicationInformation.styleTextRowLast">{{todo.noidung}}</nb-text>
            <nb-text v-else>{{todo.noidung}}</nb-text>
        </view>
    </view>
</template>
<script>
    import LibCustom from '../library/custom';
    export default {
        props: {
            objApplicationInformation: {
                type: Object,
            }
        },
        data: function () {
            return {
                screen: {
                    width: 0,
                    height: 0,
                },
                lastIndex: -1,
            };
        },
        components: {

        },
        computed: {
            getListData: function(){
                return this.objApplicationInformation;
            }
        },
        mounted: function () {
            this.screen = LibCustom.getSizeScreen();
            if(this.objApplicationInformation.styleTextRowLast){
                this.lastIndex = this.objApplicationInformation.tableData.length-1;
            }

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
    .row{
        flex: 1;
        flex-direction: row;
        justify-content: space-between;
        padding-top: 15;
        padding-right: 15;
        padding-bottom: 15;
        margin-left: 20;
    }
</style>