<template>
         <view class="container">
             <touchable-opacity :style="{width: 200, height: 200}">
                 <GestureRecognizer
                         :onSwipeUp="() => onSwipeUp(text)"
                         :onSwipeDown="() => onSwipeDown(text)"
                         :onSwipeLeft="() => onSwipeLeft(text)"
                         :onSwipeRight="() => onSwipeRight(text)"
                         :config="config"
                         :style="{
                        width: 300,
                        height: 300,
                        flex: 1,
                        backgroundColor: 'orange',
                        paddingLeft: pl,
                        }"
                 >
                     <view>
                         <nb-button><nb-text>dsadadsa</nb-text></nb-button>
                         <nb-text>{{text}}</nb-text>
                     </view>

                 </GestureRecognizer>
             </touchable-opacity>
         </view>
</template>
<script>
    import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
    export default {
        data: function () {
            return {
                text: 'hello world',
                pl: 0,
                config: {
                    velocityThreshold: 0.3,
                    directionalOffsetThreshold: 300
                }
            };
        },
        components: {
            GestureRecognizer
        },
        methods: {
            onSwipeUp: function (text) {
                alert("ban keo len tren : "+text);
            },
            onSwipeDown: function (text) {
                alert("ban vua keo xuong duoi : "+text);
            },
            onSwipeLeft: function (text) {
                this.pl = 0;
            },
            onSwipeRight: function (text) {
                this.pl = 200;
            }
        }
    };
</script>
<style>
    .container{
        flex: 1;
        background-color: red;
    }
</style>