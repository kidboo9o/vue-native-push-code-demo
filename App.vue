<template>
    <view class="container">
        <app-loading v-if="!isAppReady"></app-loading>
        <root-navigation v-if="isAppReady"></root-navigation>
    </view>


</template>

<script>
    import Vue from "vue-native-core";
    import {VueNativeBase} from "native-base";
    import {store} from "./store";
    import {Font, AppLoading} from "expo";
    import RootNavigation from "./views/Root.vue";
    import Reactotron from 'reactotron-react-native';
    Reactotron
        .configure({host: '10.255.231.165'}) // controls connection & communication settings
        .useReactNative() // add all built-in react native plugins
        .connect() // let's connect!
    console.disableYellowBox = true
    // this allows us access to the vuex-store in all of the components
    Vue.prototype.$store = store;
    // registering all native-base components to the global scope of the Vue
    Vue.use(VueNativeBase);

    export default {
        // bring in the navigation components
        components: {AppLoading, RootNavigation},
        data: function () {
            return {
                isAppReady: false,
            };
        },
        created: function () {
            this.loadFonts();
        },
        methods: {
            loadFonts: async function () {
                try {
                    this.isAppReady = false;
                    await Expo.Font.loadAsync({
                        Roboto: require("native-base/Fonts/Roboto.ttf"),
                        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
                        Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
                    });
                    this.isAppReady = true;
                } catch (error) {
                    console.log("some error occured", error);
                    this.isAppReady = true;
                }
            }
        }
    };
</script>
<style>
    .container {
        flex: 1;
    }

</style>
