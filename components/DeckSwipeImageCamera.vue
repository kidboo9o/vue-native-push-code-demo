<template>
    <nb-container :style="{marginTop: 24}">
        <view class="header">
            <nb-button transparent>
                <touchable-opacity :on-press="handleBack">
                    <nb-icon name="arrow-back" class="text-light"/>
                </touchable-opacity>
            </nb-button>
        </view>
        <view :style="{flex: 1, padding: 12}">
            <nb-deck-swiper :key="getListImageItem"
                    :dataSource="getListImageItem"
                    :looping="isLoopingRequired"
                    :renderItem="handleCardRendering"
            />
        </view>
    </nb-container>
</template>
<script>
    import React from "react";
    import LibCustom from '../library/custom';
    import {mapGetters, mapActions} from 'vuex';
    import CardComponent from "./CardImageCamera.vue";
    export default {
        props: {
            navigation: {
                type: Object
            }
        },
        components: {
            CardComponent
        },
        data: function () {
            return {
                screen: {
                    width: 0,
                    height: 0,
                },
                isLoopingRequired: true,
            };
        },
        mounted: function () {
            this.screen = LibCustom.getSizeScreen();
        },
        computed: {
            getListImageItem: function(){
                console.log("co chay vao day ne");
                this.getListImage().forEach( (item) => {
                    let temp = item.width / item.height;
                    item.width = LibCustom.viewScreen(90, 'vw');
                    item.height = item.width / temp;
                });
                return this.getListImage();
            },
        },
        methods: {
            ...mapGetters("storeCamera", ['getListImage']),
            scaleFontSize: function (size) {
                return LibCustom.scaleFontSize(size);
            },
            viewScreen: function (percent, type, minus = 0) {
                return LibCustom.viewScreen(percent, type, minus);
            },
            handleCardRendering: function(item) {
                return <CardComponent item={item} />;
            },
            handleBack: function(){
                this.navigation.goBack();
            }

        },
    };
</script>
<style>
    .header {
        flex: 0.1;
        justify-content: flex-start;
        background-color: black;
    }
    .text-light {
        color: white;
    }

</style>