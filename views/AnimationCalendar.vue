<template>
    <view class="container">
        <Calendar
        :current="'2018-01-01'"
        :maxDate="'2019-12-01'"
        :minDate="'2012-05-30'"
        :onDayPress="handleDay"
        :monthFormat="'yyyy MM'"
        :firstDay="1"
        :showWeekNumbers="true"
        />
    </view>
</template>
<script>
    import LibCustom from '../library/custom';
    import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
    export default {
        components: {
            Calendar,
            CalendarList,
            Agenda
        },
        data: function() {
            return {
                screen: {
                    width: 0,
                    height: 0,
                },

            };
        },
        methods: {

            scaleFontSize: function (size) {
                return LibCustom.scaleFontSize(size);
            },
            viewScreen: function (percent, type, minus = 0) {
                return LibCustom.viewScreen(percent, type, minus);
            },
            handleDay: function(day){
                alert("ban click day : ");
                console.log(day);
            }

        },
        mounted: function(){
            this.screen = LibCustom.getSizeScreen();
        },
        beforeUpdate() {
        }
    };
</script>
<style>
    .container{
        flex: 1;
        justify-content: center;
        align-items: center;
        background-color: orange;
    }
</style>