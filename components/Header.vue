<template>
    <view class="header row" :style="{height: viewScreen(8, 'vh')}">
        <view class="col-2 text-center">
            <nb-button transparent :on-press="() => handleDrawer(getData.route)">
                <nb-icon class="text-color" :style="{fontSize: scaleFontSize(18), paddingTop: viewScreen(1.1, 'vh')}"
                         :name="getData.icon.name"/>
            </nb-button>
        </view>
        <view class="col-10 text-center">
            <nb-title class="text-color"
                      :style="{fontSize: scaleFontSize(16), width: viewScreen(80, 'vw'), textAlign: 'left'}">
                {{getData.text.title}}
            </nb-title>
        </view>
    </view>
</template>
<script>
    import LibCustom from '../library/custom';
    import {Platform} from 'react-native';
    import {mapGetters, mapActions} from 'vuex';
    import {NavigationActions} from 'react-navigation'


    export default {
        props: {
            title: String,
            navigation: {
                type: Object
            }
        },
        data: function () {
            return {
                screen: {
                    width: 0,
                    height: 0,
                },
            };
        },
        computed: {
            getData: function () {
                return this.getHeader();
            }
        },
        mounted: function () {
            this.screen = LibCustom.getSizeScreen();
        },
        methods: {
            ...mapGetters("screenBaseOnFooter", ['getHeader', 'getNameScreenCurrent', 'getListStep']),
            ...mapActions("screenBaseOnFooter", ['setScreen', 'setListStep']),
            scaleFontSize: function (size) {
                return LibCustom.scaleFontSize(size);
            },
            viewScreen: function (percent, type, minus = 0) {
                return LibCustom.viewScreen(percent, type, minus);
            },
            handleDrawer: function (route) {
                switch (route) {
                    case "menu" :
                        this.navigation.navigate("DrawerOpen");
                        break;
                    case "back" :
                        let arr = this.getListStep();
                        let size = arr.length;
                        console.log(arr);
                        switch (this.getNameScreenCurrent()) {
                            case "ThongBaoChung":
                                this.setScreen("ThongBao");
                                this.setListStep("ThongBao");
                                break;
                            case "ChiTietThongBao":
                                console.log(arr);
                                for (let i = size - 1; i >= 0; i--) {
                                    if (arr[i] === "ChiTietThongBao") {
                                        if (arr[i - 1] === "ChiTietThongBao") {
                                            continue;
                                        } else {
                                            this.setScreen(arr[i - 1]);
                                            this.setListStep(arr[i - 1]);
                                            break;
                                        }

                                    }
                                }
                                break;
                            default:
                                this.setScreen(this.getNameScreenCurrent());
                                break;
                        }

                        break;
                }

            }
        },


    };
</script>
<style>
    .header {
        background-color: #3868d9;
    }

    .text-color {
        color: white;
    }
    .row{
        flex-direction: row;
    }
    .col-2{
        width: 16.666667%;
    }
    .col-10{
        width: 83.333333%;
    }
    .text-center{
        justify-content: center;
        align-items: center;
    }
</style>