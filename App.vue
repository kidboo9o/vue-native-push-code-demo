<template>
    <view class="container">
        <app-loading v-if="!isAppReady"></app-loading>
        <root-navigation v-if="isAppReady"></root-navigation>
    </view>


</template>

<script>
    import Vue from "vue-native-core";
    import {VueNativeBase} from "native-base";
    import {Font, AppLoading, Asset} from "expo";
    import RootNavigation from "./views/Root.vue";
    import moment from "moment";
    console.disableYellowBox = true;
    // this allows us access to the vuex-store in all of the components
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
            this.loadAll();
        },
        methods: {
            loadAll: async function(){
                try {
                    this.isAppReady = false;
                    let loadDoneFont = await this.loadFonts();
                    this.isAppReady = true;
                } catch (error) {
                    console.log("some error occured", error);
                    this.isAppReady = true;
                }
            },
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
            },

        }
    };
</script>
<style>
    .container {
        flex: 1;
    }

</style>
