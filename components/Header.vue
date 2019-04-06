<template>
        <nb-header class="header">
            <nb-left>
                <nb-button transparent :on-press="() => handleDrawer(getData.route)">
                    <nb-icon class="text-color" :style="{fontSize: scaleFontSize(18), paddingTop: viewScreen(1.1, 'vh')}" :name="getData.icon.name" />
                </nb-button>
            </nb-left>
            <nb-body>
                <nb-title class="text-color" :style="{fontSize: scaleFontSize(16)}">{{getData.text.title}}</nb-title>
            </nb-body>
           <nb-right />
        </nb-header>

</template>
<script>
    import LibCustom from '../library/custom';
    import {Platform} from 'react-native';
    import {mapGetters, mapActions} from 'vuex';
    import { NavigationActions } from 'react-navigation'

    const backAction = NavigationActions.back({
        key: null
    })

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
            getData: function(){
                return this.getHeader();
            }
        },
        mounted: function () {
            this.screen = LibCustom.getSizeScreen();
        },
        methods: {
            ...mapGetters("screenBaseOnFooter", ['getHeader']),
            scaleFontSize: function (size) {
                return LibCustom.scaleFontSize(size);
            },
            viewScreen: function (percent, type, minus = 0) {
                return LibCustom.viewScreen(percent, type, minus);
            },
            handleDrawer: function(route){
                switch(route){
                    case "menu" :  this.navigation.navigate("DrawerOpen");
                    break;
                    case "back" : this.navigation.navigate("Home"); alert("nhay vao day chua");
                    break;
                }

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