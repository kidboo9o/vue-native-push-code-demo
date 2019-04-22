<template>
    <view class="container my-5">
        <view
              :style="{
                        borderColor: 'rgba(0,0,0,0.3)',
                        borderBottomWidth: isShowDate ? 1 : 0,
                        borderTopWidth: isShowDate ? 1 : 0,
                        borderLeftWidth: isShowDate ? 1 : 0,
                        borderRightWidth: isShowDate ? 1 : 0,
                        width: viewScreen(90, 'vw'),
                        height: '100%',
                        marginTop: '10%',
                        marginBottom: '10%',

                  }">
            <touchable-opacity class="text-center" :on-press="handleShowDate"
                               :style="{
                        width: viewScreen(90,'vw'),
                        height: viewScreen(10, 'vh'),
                        borderColor: 'rgba(0,0,0,0.3)',
                        borderBottomWidth: 1,
                        borderLeftWidth: !isShowDate ? 1 : 0,
                        borderRightWidth: !isShowDate ? 1 : 0,
                        borderTopWidth: !isShowDate ? 1 : 0,
                        backgroundColor: 'rgba(0,0,0,0.08)',

                    }">
                    <nb-text class="text-bold" :style="{fontSize: scaleFontSize(16), letterSpacing: 2}">
                        <nb-text :style="{color: isTextMonth ? '#3868D9' : 'black'}">{{getMonthFunc | formatMonthDate}}</nb-text>
                        <nb-text>/</nb-text>
                        <nb-text :style="{color: isTextYear ? '#3868D9' : 'black'}">{{getYearFunc | formatYearDate}}</nb-text>
                    </nb-text>
            </touchable-opacity>
            <view class="container" v-if="isShowDate">
                <month-selector-calendar
                        :selectedDate="getMonthFunc"
                        :onMonthTapped="handleMonth"
                        :onYearChanged="handleYear"
                        :selectedBackgroundColor="'red'"
                        :localeLanguage="'en'"
                        :swipable="true"
                        :seperatorColor="'green'"
                >
                </month-selector-calendar>
            </view>
            <view class="mx-5 mb-10 row" v-if="isShowDate">
                <nb-button :on-press="handleSearch"><nb-text>Tra cứu</nb-text></nb-button>
                <nb-button class="mx-5" :on-press="handleCancel"><nb-text>Hủy</nb-text></nb-button>
            </view>
        </view>

    </view>
</template>
<script>
    import DateTimePicker from 'react-native-modal-datetime-picker';
    import LibCustom from '../library/custom';
    import MonthSelectorCalendar from "react-native-month-selector";
    import moment from "moment";
    import {mapGetters, mapActions} from 'vuex';
    export default {
        props: {},
        data: function () {
            return {
                screen: {
                    width: 0,
                    height: 0,
                },
                isShowPicker: false,
                month: moment(),
                year: moment(),
                showDate: null,
                isShowDate: false,
                countMonth: -1,
                isTextMonth: false,
                countYear: -1,
                isTextYear: false,
            };
        },

        components: {
            DateTimePicker,
            MonthSelectorCalendar
        },
        computed: {
            getMonthFunc: function(){
                this.countMonth++;
                if(this.countMonth > 0){
                    this.isTextMonth = true;
                    this.isTextYear = false;
                }
                return this.getMonth();
            },
            getYearFunc: function(){
                this.countYear++;
                if(this.countYear > 0){
                    this.isTextYear = true;
                    this.isTextMonth = false;
                }
                return this.getYear();
            },
        },
        mounted: function () {
            this.screen = LibCustom.getSizeScreen();
        },
        methods: {
            ...mapGetters("getMonthYearinSearch", ["getMonth", "getYear"]),
            ...mapActions("getMonthYearinSearch", ["setMonth", "setYear", "setSearch"]),
            scaleFontSize: function (size) {
                return LibCustom.scaleFontSize(size);
            },
            viewScreen: function (percent, type, minus = 0) {
                return LibCustom.viewScreen(percent, type, minus);
            },
            showDatePicker: function () {
                this.isShowPicker = true;
            },
            handlePickerConfirm: function () {

            },
            handlePickerCancel: function () {
                this.isShowPicker = false;
            },
            handleMonth: function (month) {
               this.setMonth(month);
            },
            handleYear: function (year) {
                this.setYear(year);
            },
            handleShowDate: function(){
                this.isShowDate = !this.isShowDate;
            },
            handleCancel: function(){
                this.isShowDate = false;
            },
            handleSearch: function(){
                this.isShowDate = false;
                this.setSearch(true);
            }
        },
        beforeDestroy: function(){
            this.setMonth(this.month);
            this.setYear(this.year);
        },
        filters: {

        }
    }
</script>
<style>
    .container {
        flex: 1;
        justify-content: center;
        align-items: center;
    }

    .text-center {
        justify-content: center;
        align-items: center;
    }

    .text-bold {
        font-weight: bold;
    }
    .my-5{
        margin-top: 5%;
        margin-bottom: 5%;
    }
    .row{
        flex: 1;
        flex-direction: row;
    }
    .mx-5{
        margin-left: 5%;
        margin-right: 5%;
    }
    .mb-10{
        margin-bottom: 10%;
    }

</style>