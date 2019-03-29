<template>
        <nb-header class="header">
            <nb-left>
                <nb-button transparent :on-press="handleDrawer">
                    <nb-icon class="text-color" :style="{fontSize: scaleFontSize(18), paddingTop: viewScreen(1.1, 'vh')}" name="menu" />
                </nb-button>
            </nb-left>
            <nb-body>
                <nb-title class="text-color" :style="{fontSize: scaleFontSize(16)}">{{title}}</nb-title>
            </nb-body>
            <nb-right />
        </nb-header>

</template>
<script>
    import LibCustom from '../library/custom';
    import {Platform} from 'react-native';
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
            handleDrawer: function(){
                this.navigation.navigate("DrawerOpen");
            }
        },


    };
</script>
<style>
    .header{
        background-color: #303f9f;
    }
    .text-color{
        color: white;
    }
</style>