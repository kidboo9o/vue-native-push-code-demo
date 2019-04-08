<template>
    <view class="container">
        <lottie
                ref="lottieAnimation"
                :style="{
        width: 100,
        height: 100,
        backgroundColor: 'transparent',
      }"
                :source="animation ? animation  : {}"
        />
        <view class="button-container">
            <button title="Start Animation" :on-press="playAnimation" />
        </view>
    </view>
</template>
<script>
    import { DangerZone } from "expo";
    const { Lottie } = DangerZone;
    import lottieAnimation from '../assets/json/434-gradient-animated-background.json';
    export default {
        components: { Lottie },
        data: function() {
            return {
                animation: null
            };
        },
        methods: {
            async loadAnimationAsync() {
                try {
                    const lottieAnimationJsonResponse = await fetch(
                        "https://cdn.rawgit.com/airbnb/lottie-react-native/635163550b9689529bfffb77e489e4174516f1c0/example/animations/Watermelon.json"
                    );
                    const parsedJson = await lottieAnimationJsonResponse.json();
                    //    this.animation = parsedJson;
                    this.animation = lottieAnimation;
                    this.playAnimation();
                } catch (error) {
                    console.log(
                        "%c some inside loadAnimationAsync ",
                        "background: salmon; color: black",
                        error
                    );
                }
            },
            playAnimation() {
                if (!this.animation) {
                    this.loadAnimationAsync();
                } else if (this.$refs.lottieAnimation) {
                    this.$refs.lottieAnimation.reset();
                    this.$refs.lottieAnimation.play();
                }
            }
        },
        mounted() {
            this.playAnimation();
        },
        beforeUpdate() {
            this.playAnimation();
        }
    };
</script>
<style>
    .container {
        background-color: #fff;
        align-items: center;
        justify-content: center;
        flex: 1;
    }
    .button-container {
        padding-top: 20;
    }
</style>