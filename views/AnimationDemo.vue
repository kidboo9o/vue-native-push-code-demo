<template>
    <nb-container>
        <nb-header />
        <view :style="{flex: 1, padding: 12}">
            <nb-deck-swiper
                    :dataSource="cardItemsArr"
                    :looping="isLoopingRequired"
                    :renderItem="handleCardRendering"
            />
        </view>
    </nb-container>
</template>
<script>
    import React from "react";
    import { View, Text } from "react-native";
    import CardComponent from "./card.vue";
    export default {
        data: function() {
            return {
                cardItemsArr: [
                    {
                        text: "Card One",
                        name: "One",
                        image: require('../assets/images/img-01.jpg'),
                    },
                    {
                        text: "Card Two",
                        name: "Two",
                        image: require('../assets/images/img-02.jpg'),
                    },
                    {
                        text: "Card Three",
                        name: "Three",
                        image: require('../assets/images/img-03.jpg'),
                    },
            ],
            isLoopingRequired: false
        };
        },
        methods: {
            handleCardRendering: function(item) {
                return <CardComponent item={item} />;
            }
        }
    };
</script>