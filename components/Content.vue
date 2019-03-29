<template>
    <view class="content">
        <nb-card>
            <nb-card-item header bordered>
                    <nb-text>NativeBase</nb-text>
            </nb-card-item>
            <nb-card-item bordered>
                <nb-body>
                    <nb-text>
                        NativeBase is a free and open source framework that enable developers to build high-quality mobile apps using React Native iOS and Android apps with a fusion of ES6.
                    </nb-text>
                </nb-body>
            </nb-card-item>
        </nb-card>
        <nb-card>
            <nb-card-item header bordered>
                <nb-text>NativeBase</nb-text>
            </nb-card-item>
            <nb-card-item bordered>
                <nb-body>
                    <nb-text>
                        NativeBase is a free and open source framework that enable developers to build high-quality mobile apps using React Native iOS and Android apps with a fusion of ES6.
                    </nb-text>
                </nb-body>
            </nb-card-item>
        </nb-card>

    </view>
</template>
<script>
    import LibCustom from '../library/custom';

    export default {

        data: function () {
            return {
                screen: {
                    width: 0,
                    height: 0,
                },
            };
        },
        componenets: {
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
        },


    };
</script>
<style>
    .content{
        flex: 1;
    }
</style>