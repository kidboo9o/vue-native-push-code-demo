<template>
    <nb-container>
        <nb-content>
            <view class="container" :style="{width: screen.width, height: screen.height}">
                <nb-text> Welcome to Vue Native!</nb-text>
            </view>
        </nb-content>
    </nb-container>
</template>
<script>
    import LibCustom from "../library/custom"
    export default {
        props: {
            navigation: {
                type: Object
            }
        },
        created: function () {
        },
        components: {},
        computed: {},
        data: function () {
            return {
                screen: {
                    width: 0,
                    height: 0,
                },
            };
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
        },


    };
</script>
<style>
    .container {
        flex: 1;
        justify-content: center;
        align-items: center;
    }
</style>