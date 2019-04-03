<template>
    <nb-container>
        <nb-content>
            <view class="container" :style="{height: viewScreen(100, 'vh')}">
                <view class="parentProcess">
                    <AnimatedCircularProgress
                            :size="400"
                            :width="15"
                            :fill="getNumber"
                            :tintColor="'red'"
                            :onAnimationComplete="animationComplete"
                            :backgroundColor="'grey'" />
                    <nb-text class="text-center">{{getNumber}}%</nb-text>
                </view>
                <nb-text>{{getText}}</nb-text>
            </view>
        </nb-content>
    </nb-container>
</template>
<script>
    import LibCustom from '../library/custom';
    import {AppRegistry, StyleSheet, Animated, Easing, AsyncStorage} from 'react-native';
    import Expo,{ Svg } from 'expo';
    const {
        Circle,
        Ellipse,
        G,
        Text,
        TSpan,
        TextPath,
        Path,
        Polygon,
        Polyline,
        Line,
        Rect,
        Use,
        Image,
        Symbol,
        Defs,
        LinearGradient,
        RadialGradient,
        Stop,
        ClipPath,
        Pattern,
        Mask,
    } = Svg;
    import {AnimatedCircularProgress} from 'react-native-circular-progress';
    import {mapGetters, mapActions} from 'vuex';
    import localStorage from 'react-native-sync-localstorage'
    async function register(){
        const {status} = await Expo.Permissions.askAsync(Expo.Permissions.NOTIFICATIONS);
        if(status !== 'granted'){
            alert("you need to enable permission in settings");
            return;
        }
        const token = await Expo.Notifications.getExpoPushTokenAsync();
     //   const token = await Expo.Notifications.getDevicePushTokenAsync();
        console.log(status, token);
    }

    export default {
        props: {},
        components: {
            AnimatedCircularProgress
        },
        created: function(){
            this.getTimeFromNow();
            setInterval(this.getTimeFromNow, 1000);
            localStorage.setItem('user', "au dep trai");
            register();
            this.listener = Expo.Notifications.addListener(this.listen);
        },
        destroyed () {
            clearInterval(this.getTimeFromNow);
            Expo.Notifications.removeListener(this.listen);
        },
        computed: {
            getNumber: function(){
                this.number = this.getPercent();
                if(this.number != this.timeFromNow && this.number < 100){
                    this.number++;
                    this.setPercent(this.number);
                }
                return this.number;
            },
            getText: function(){
                return localStorage.getItem('user');
            }


        },
        data: function () {
            return {
                screen: {
                    width: 0,
                    height: 0,
                },
                number: 0,
                timeEstimate: 60,
                complete: 0,
                timeFromNow: null,
                text: '',
            };
        },
        mounted: function () {
            this.screen = LibCustom.getSizeScreen();
        },

        methods: {
            ...mapActions("timeProcess", ['setPercent']),
            ...mapGetters("timeProcess", ['getPercent']),
            getTimeFromNow () {
                this.timeFromNow = Date.now();
            },
            scaleFontSize: function (size) {
                return LibCustom.scaleFontSize(size);
            },
            viewScreen: function (percent, type, minus = 0) {
                return LibCustom.viewScreen(percent, type, minus);
            },
            animationComplete: function(){
            },
            listen: function({origin, data}){
                console.log("cool data ", origin, data);
            }
        },

    };
</script>
<style>
    .container {
        flex: 1;
        justify-content: center;
        align-items: center;
    }

    .parentProcess {
        position: relative;
        background-color: orange;
        width: 400;
        height: 400;
    }

    .text-center {
        position: absolute;
        top: 40%;
        left: 40%;
        bottom: 0;
        right: 0;
        font-size: 20;
        font-weight: bold;

    }
</style>