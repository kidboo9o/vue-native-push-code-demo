<template>
    <view :style="{
            width: viewScreen(100, 'vw'),
            height: viewScreen(100, 'vh'),
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.8)'
    }">
        <view>
            <date-time-picker
                    :is24Hour="false"
                    :isVisible="isVisible"
                    :mode="'time'"
                    :onConfirm="handleConfirm"
                    :onCancel="handleCancel"
                    :timePickerModeAndroid="'clock'"

            >
            </date-time-picker>
        </view>
        <view>

        </view>
    </view>
</template>
<script>
    import LibCustom from '../library/custom';
    import moment from "moment";
    import {mapGetters, mapActions} from 'vuex';
    import DateTimePicker from "react-native-modal-datetime-picker";
    export default {
        props: {
        },
        data: function () {
            return {
                screen: {
                    width: 0,
                    height: 0,
                },
                isVisible: true,
            };
        },
        created: function () {
        },
        components: {
            DateTimePicker
        },
        computed: {

        },
        mounted: function () {
            this.screen = LibCustom.getSizeScreen();
        },
        methods: {
            ...mapActions("getDate", ["setShowDateTime", "setTime"]),
            scaleFontSize: function (size) {
                return LibCustom.scaleFontSize(size);
            },
            viewScreen: function (percent, type, minus = 0) {
                return LibCustom.viewScreen(percent, type, minus);
            },
            handleConfirm: function(date){
                console.log("in ra date : ");
                console.log(date);
                let temp = JSON.parse(JSON.stringify(date));
                let timePicked = new Date(temp).toLocaleTimeString();
                this.setTime(timePicked);
                this.setShowDateTime(false);
            },
            handleCancel: function(){
                this.setShowDateTime(false);
            },
        },
        beforeDestroy: function(){
            this.setShowDateTime(false);
        },
        filters: {

        }
    }
</script>
<style>
    .row{
        flex-direction: row;
        justify-content: space-between;
    }
    .mx-5{
        margin-left: 5%;
        margin-right: 5%;
    }
    .p-5{
        padding-left: 5%;
        padding-right: 5%;
        padding-top: 5%;
        padding-bottom: 5%;
    }
    .bg-light{
        background-color: white;
    }
    .text-small{
        font-size: 10;
    }

</style>