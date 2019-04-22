<template>
    <view :style="{
            width: viewScreen(100, 'vw'),
            height: viewScreen(100, 'vh'),
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)'
    }">
        <view v-if="!isShowDetail" :onLayout="handleLayoutCalendar">
            <Calendar
                    :current="currentDate"
                    :minDate="minDate"
                    :maxDate="maxDate"
                    :onDayPress="handleDay"
                    :monthFormat="'MM yyyy'"
                    :onMonthChange="handleMonth"
                    :hideArrows="false"
                    :hideExtraDays="false"
                    :disableMonthChange="false"
                    :firstDay="1"
                    :hideDayNames="false"
                    :showWeekNumbers="true"
                    :markedDates="getDotCalendar"
                    :markingType="'custom'"
            />
        </view>
        <view v-else
              :style="{
                    width: widthAgenda,
                    height: heightAgenda,
              }">
            <agenda
                    :minDate="minDate"
                    :maxDate="maxDate"
                    :pastScrollRange="50"
                    :futureScrollRange="50"
                    :refreshControl="null"
                    :items="items"
                    :loadItemsForMonth="handleLoadItemsMonth"
                    :renderItem="renderItems"
                    :renderEmptyDate="renderEmptyDate"
                    :rowHasChanged="rowHasChanged"
                    :markedDates="dot2"
                    :markingType="'custom'"
                    :theme="{
                        agendaDayTextColor: 'grey',
                        agendaDayNumColor: 'grey',
                        agendaTodayColor: 'blue',
                        agendaKnobColor: 'grey'
                    }"
            >

            </agenda>
        </view>
        <view class="row bg-light p-5">
            <view class="row" v-if="!isShowDetail">
                <nb-button :on-press="handleConfirm"><nb-text class="text-small">Xác nhận</nb-text></nb-button>
                <nb-button :on-press="handleCancel" class="mx-5"><nb-text class="text-small">Hủy</nb-text></nb-button>
            </view>
            <view >
                <nb-button :on-press="handleShowDetail"><nb-text class="text-small">{{isShowDetail | showButtonConvert}}</nb-text></nb-button>
            </view>
        </view>
    </view>
</template>
<script>
    import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
    import LibCustom from '../library/custom';
    import moment from "moment";
    import React, {Component} from 'react';
    import {View, Text, Image} from "react-native";
    import {mapGetters, mapActions} from 'vuex';
    import { LinearGradient } from 'expo';
    export default {
        props: {
        },
        data: function () {
            return {
                screen: {
                    width: 0,
                    height: 0,
                },
                /* random style renderItem */

                ItemLinearRadient: [
                    {
                        "colors": [
                            "#ff9a9e",
                            "#fad0c4"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#a18cd1",
                            "#fbc2eb"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#fad0c4",
                            "#fad0c4"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#ffecd2",
                            "#fcb69f"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#ff9a9e",
                            "#fecfef"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#f6d365",
                            "#fda085"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#fbc2eb",
                            "#a6c1ee"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#fdcbf1",
                            "#e6dee9"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#a1c4fd",
                            "#c2e9fb"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#d4fc79",
                            "#96e6a1"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#84fab0",
                            "#8fd3f4"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#cfd9df",
                            "#e2ebf0"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#a6c0fe",
                            "#f68084"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#fccb90",
                            "#d57eeb"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#e0c3fc",
                            "#8ec5fc"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#f093fb",
                            "#f5576c"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#fdfbfb",
                            "#ebedee"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#4facfe",
                            "#00f2fe"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#43e97b",
                            "#38f9d7"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#fa709a",
                            "#fee140"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#30cfd0",
                            "#330867"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#a8edea",
                            "#fed6e3"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#5ee7df",
                            "#b490ca"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#d299c2",
                            "#fef9d7"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#f5f7fa",
                            "#c3cfe2"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#667eea",
                            "#764ba2"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#fdfcfb",
                            "#e2d1c3"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#89f7fe",
                            "#66a6ff"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#fddb92",
                            "#d1fdff"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#9890e3",
                            "#b1f4cf"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#ebc0fd",
                            "#d9ded8"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#96fbc4",
                            "#f9f586"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#2af598",
                            "#009efd"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#cd9cf2",
                            "#f6f3ff"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#6a11cb",
                            "#2575fc"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#37ecba",
                            "#72afd3"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#ebbba7",
                            "#cfc7f8"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#fff1eb",
                            "#ace0f9"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#c471f5",
                            "#fa71cd"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#48c6ef",
                            "#6f86d6"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#feada6",
                            "#f5efef"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#e6e9f0",
                            "#eef1f5"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#accbee",
                            "#e7f0fd"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#e9defa",
                            "#fbfcdb"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#c1dfc4",
                            "#deecdd"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#0ba360",
                            "#3cba92"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#00c6fb",
                            "#005bea"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#74ebd5",
                            "#9face6"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#6a85b6",
                            "#bac8e0"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#a3bded",
                            "#6991c7"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#9795f0",
                            "#fbc8d4"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#a7a6cb",
                            "#8989ba"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#f43b47",
                            "#453a94"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#0250c5",
                            "#d43f8d"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#88d3ce",
                            "#6e45e2"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#d9afd9",
                            "#97d9e1"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#7028e4",
                            "#e5b2ca"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#13547a",
                            "#80d0c7"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#ff0844",
                            "#ffb199"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#93a5cf",
                            "#e4efe9"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#434343",
                            "#000000"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#93a5cf",
                            "#e4efe9"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#92fe9d",
                            "#00c9ff"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#ff758c",
                            "#ff7eb3"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#868f96",
                            "#596164"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#c79081",
                            "#dfa579"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#8baaaa",
                            "#ae8b9c"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#f83600",
                            "#f9d423"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#b721ff",
                            "#21d4fd"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#6e45e2",
                            "#88d3ce"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#d558c8",
                            "#24d292"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#abecd6",
                            "#fbed96"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#5f72bd",
                            "#9b23ea"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#09203f",
                            "#537895"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#ddd6f3",
                            "#faaca8"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#dcb0ed",
                            "#99c99c"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#f3e7e9",
                            "#e3eeff"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#c71d6f",
                            "#d09693"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#96deda",
                            "#50c9c3"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#f77062",
                            "#fe5196"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#a8caba",
                            "#5d4157"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#29323c",
                            "#485563"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#16a085",
                            "#f4d03f"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#ff5858",
                            "#f09819"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#2b5876",
                            "#4e4376"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#00cdac",
                            "#8ddad5"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#4481eb",
                            "#04befe"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#dad4ec",
                            "#f3e7e9"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#874da2",
                            "#c43a30"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#4481eb",
                            "#04befe"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#e8198b",
                            "#c7eafd"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#f794a4",
                            "#fdd6bd"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#64b3f4",
                            "#c2e59c"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#0fd850",
                            "#f9f047"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#ee9ca7",
                            "#ffdde1"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#209cff",
                            "#68e0cf"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#bdc2e8",
                            "#e6dee9"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#e6b980",
                            "#eacda3"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#1e3c72",
                            "#2a5298"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#9be15d",
                            "#00e3ae"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#ed6ea0",
                            "#ec8c69"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#ffc3a0",
                            "#ffafbd"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#cc208e",
                            "#6713d2"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#b3ffab",
                            "#12fff7"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#243949",
                            "#517fa4"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#fc6076",
                            "#ff9a44"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#dfe9f3",
                            "#ffffff"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#00dbde",
                            "#fc00ff"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#f9d423",
                            "#ff4e50"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#50cc7f",
                            "#f5d100"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#0acffe",
                            "#495aff"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#616161",
                            "#9bc5c3"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#df89b5",
                            "#bfd9fe"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#ed6ea0",
                            "#ec8c69"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#d7d2cc",
                            "#304352"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#e14fad",
                            "#f9d423"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#b224ef",
                            "#7579ff"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#c1c161",
                            "#d4d4b1"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#ec77ab",
                            "#7873f5"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#007adf",
                            "#00ecbc"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#20E2D7",
                            "#F9FEA5"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#A8BFFF",
                            "#884D80"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#B6CEE8",
                            "#F578DC"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#FFFEFF",
                            "#D7FFFE"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#E3FDF5",
                            "#FFE6FA"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#7DE2FC",
                            "#B9B6E5"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#CBBACC",
                            "#2580B3"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#B7F8DB",
                            "#50A7C2"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    },
                    {
                        "colors": [
                            "#007adf",
                            "#00ecbc"
                        ],
                        "start": [
                            0,
                            0
                        ],
                        "end": [
                            1,
                            0
                        ],
                        "style": {
                            "flex": 1,
                            "margin": 10,
                            "borderRadius": 10
                        },
                        "colorName": "#3686D9",
                        "colorTime": "red",
                        "colorRoom": "white"
                    }
                ],

                /* random style renderItem */

                currentDate: new Date(),
                minDate: new Date(),
                maxDate: moment().add(3, 'month').format("YYYY-MM-DD"),
                isShowDetail: false,

                dot1: {
                    "2019-04-19": {
                        customStyles: {
                            container: {
                                backgroundColor: 'orange',
                            },
                            text: {
                                color: 'black',
                                fontWeight: 'bold'
                            },
                        },
                    },
                    "2019-05-05": {
                        customStyles: {
                            container: {
                                backgroundColor: 'blue',
                            },
                            text: {
                                color: 'black',
                                fontWeight: 'bold'
                            },
                        },
                    },
                    "2019-06-10": {
                        customStyles: {
                            container: {
                                backgroundColor: 'purple',
                            },
                            text: {
                                color: 'black',
                                fontWeight: 'bold'
                            },
                        },
                    },

                },
                tempDot1: [],
                dot2: {
                    "2019-04-19": {
                        customStyles: {
                            container: {
                                backgroundColor: 'orange',
                            },
                            text: {
                                color: 'black',
                                fontWeight: 'bold'
                            },
                        },
                    },
                    "2019-05-05": {
                        customStyles: {
                            container: {
                                backgroundColor: 'blue',
                            },
                            text: {
                                color: 'black',
                                fontWeight: 'bold'
                            },
                        },
                    },
                    "2019-06-10": {
                        customStyles: {
                            container: {
                                backgroundColor: 'purple',
                            },
                            text: {
                                color: 'black',
                                fontWeight: 'bold'
                            },
                        },
                    },

                },
                /* agenda */
                widthAgenda: null,
                heightAgenda: null,
                items: {},
            };
        },
        created: function () {
        },
        components: {
            Calendar,
            CalendarList,
            Agenda,
        },
        computed: {
            getDotCalendar: function(){
                return this.dot1;
            },
            getCurrentDate: function(){
                return this.currentDate;
            }
        },
        mounted: function () {
            this.screen = LibCustom.getSizeScreen();
        },
        methods: {
            ...mapActions("getDate", ["setShowDate", "setDate"]),
            scaleFontSize: function (size) {
                return LibCustom.scaleFontSize(size);
            },
            viewScreen: function (percent, type, minus = 0) {
                return LibCustom.viewScreen(percent, type, minus);
            },
            handleDay: function(day){
                const markedDates = Object.assign({}, this.dot1);
                const initialDates = Object.assign({}, this.dot2);
                if(!Object.keys(this.dot2).includes(day.dateString)){
                    this.tempDot1.push(day.dateString);
                    let arrKeys = this.tempDot1.filter( item => item !== day.dateString);
                    let arrKeysDot = Object.keys(markedDates);
                    arrKeysDot.forEach((item) => {
                        if(arrKeys.includes(item)){
                            delete markedDates[item];
                        }
                    });
                    let obj = {
                        customStyles: {
                            container: {
                                backgroundColor: 'blue',
                            },
                            text: {
                                color: 'white',
                                fontWeight: 'bold'
                            },
                        },
                    };
                    markedDates[day.dateString] = Object.assign({}, obj);
                    this.dot1 = Object.assign({}, markedDates);
                }else{
                    let arrKeys = this.tempDot1.filter( item => item !== day.dateString);
                    let arrKeysDot = Object.keys(markedDates);
                    arrKeysDot.forEach((item) => {
                        if(arrKeys.includes(item)){
                            delete markedDates[item];
                        }
                    });
                    this.dot1 = Object.assign({}, markedDates);
                }

                this.currentDate = day.dateString;
                let temp = moment(day.dateString).format("DD/MM/YYYY");
                this.setDate(temp);
            },
            handleMonth: function(month){
                console.log(month);
                let temp = moment(month.dateString).format("DD/MM/YYYY");
                this.setDate(temp);
            },
            handleConfirm: function(){
                this.setShowDate(false);
            },
            handleCancel: function(){
                this.setShowDate(false);
            },
            handleShowDetail: function(){
                this.isShowDetail = !this.isShowDetail;
            },
            handleLayoutCalendar: function(event){
                this.widthAgenda = event.nativeEvent.layout.width;
                this.heightAgenda = event.nativeEvent.layout.height;
            },

            /* agenda */
            handleLoadItemsMonth: function(day){
                setTimeout(() => {
                    let temp = {};
                    let str;
                    let arrKeys = Object.keys(this.dot1);
                    let arrRandom = [
                        {name: "Nguyễn Văn A", time: "6:00 AM đến 7:00 AM", room: "phòng sinh hoạt cộng đồng"},
                        {name: "Nguyễn Văn B", time: "9:00 AM đến 10:00 AM", room: "Hồ bơi"},
                    ];
                    let i=0;
                    do{
                        str = moment().add(i, 'day').format("YYYY-MM-DD");
                        console.log(str);
                        if(arrKeys.includes(str)){
                            temp[str] = arrRandom;
                        }else{
                            temp[str] = [];
                        }
                        i++;
                    } while(str !== this.maxDate);
                    this.items = temp;
                },1000)

            },
            renderItems: function(item) {
                let indexRandom = Math.ceil((Math.random() * this.ItemLinearRadient.length-1) + 0);
                let startPrimary = Math.random();
                let arrStart = [Math.floor(startPrimary), startPrimary];
                let endPrimary = Math.random();
                let arrEnd = [Math.ceil(endPrimary), endPrimary];

                return (
                    <LinearGradient
                        colors={this.ItemLinearRadient[indexRandom].colors}
                        start={arrStart}
                        end={arrEnd}
                        style={this.ItemLinearRadient[indexRandom].style}
                     >
                            <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
                                <View style={{justifyContent: 'center', alignItem: 'center'}}>
                                    <Image
                                    style={{width: 50, height: 50, borderRadius: 50}}
                                    source={require("../assets/images/avatar1.png")}
                                    />
                                </View>
                                <View style={{marginLeft: 10, marginRight: 10, paddingRight: 10}}>
                                    <Text style={{fontWeight: "bold", color: this.ItemLinearRadient[indexRandom].colorName , fontSize: 18}}>{item.name}</Text>
                                    <Text style={{color: this.ItemLinearRadient[indexRandom].colorTime, fontStyle: "italic"}}>Thời gian: {item.time}</Text>
                                    <Text style={{color: this.ItemLinearRadient[indexRandom].colorRoom}}>đã đăng kí {item.room}</Text>
                                </View>
                            </View>
                    </LinearGradient>
                );
            },
            renderEmptyDate: function(){
                return (
                    <View style={{flex: 1, justifyContent: 'center', marginLeft: 20}}>
                        <Text>Chưa có lịch book phòng</Text>
                    </View>
                );
            },
            rowHasChanged: function(r1, r2){
                r1.text !== r2.text;
            },

        },
        beforeDestroy: function(){
            this.setShowDate(false);
        },
        filters: {
            showButtonConvert: function(value){
                if(value){
                    return "Quay lại";
                }
                return "Xem chi tiết";
            }
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