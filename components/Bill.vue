<template>
    <view class="container">
        <view class="header"
              :style="{
                    width: viewScreen(100, 'vw'),
                    height: viewScreen(12, 'vh'),
                    borderColor: 'rgba(0,0,0,0.8)',
                    borderBottomWidth: 0.5
                }">
            <nb-text class="text-light">TÙY CHỌN THỜI GIAN(Tháng/Năm) </nb-text>
        </view>
        <view class="container">
            <nb-button :on-press="showDatePicker"><nb-text>Show Datepicker</nb-text></nb-button>
            <date-time-picker
                    :isVisible="isShowPicker"
                    :onConfirm="handlePickerConfirm"
                    :mode="'date'"
                    :is24Hour="false"
                    :onCancel="handlePickerCancel"
            >

            </date-time-picker>
            <month-selector-calendar
                    :selectedDate="month"
                    :onMonthTapped="handleMonth"
                    :onYearChanged="handleYear"
                    :selectedBackgroundColor="'red'"
                    :localeLanguage="'en'"
                    :swipable="true"
            >
            </month-selector-calendar>
        </view>
    </view>
</template>
<script>
    import DateTimePicker from 'react-native-modal-datetime-picker';
    import LibCustom from '../library/custom';
    import MonthSelectorCalendar from "react-native-month-selector";
    import moment from "moment";
    export default {
        props: {},
        data: function () {
            return {
                screen: {
                    width: 0,
                    height: 0,
                },
                isShowPicker: false,
                month: moment.Moment,
            };
        },
        components: {
            DateTimePicker,
            MonthSelectorCalendar
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
            showDatePicker: function(){
                this.isShowPicker = true;
            },
            handlePickerConfirm: function(){

            },
            handlePickerCancel: function(){
                this.isShowPicker = false;
            },
            handleMonth: function(month){
                alert(moment(month).format());
                this.month = month;
            },
            handleYear: function(){
                alert("handle Year");
            }
        }
    }
</script>
<style>
    .container{
        flex: 1;
        justify-content: center;
        align-items: center;
    }
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

</style>