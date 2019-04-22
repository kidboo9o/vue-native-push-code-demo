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
    import {Font, AppLoading, Asset} from "expo";
    import RootNavigation from "./views/Root.vue";
    import Reactotron from 'reactotron-react-native';
    import moment from "moment";
    import localStorage from "./library/localStorage";
    import {mapGetters, mapActions} from 'vuex';
    Reactotron
        .configure({host: '192.168.1.10'}) // controls connection & communication settings
        .useReactNative() // add all built-in react native plugins
        .connect() // let's connect!
    console.disableYellowBox = true;
    // this allows us access to the vuex-store in all of the components
    Vue.prototype.$store = store;
    // registering all native-base components to the global scope of the Vue
    Vue.use(VueNativeBase);
    Vue.filter("formatMonthDate", function(value){
        if(value){
            return moment(value).format('M');
        }
    });
    Vue.filter("formatYearDate", function(value){
        if(value){
            return moment(value).format('YYYY');
        }
    });
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
            this.loadInfoUserIfExists("user");
        },
        methods: {
            ...mapActions("login", ["saveInforUser"]),
            loadAll: async function(){
                try {
                    this.isAppReady = false;
                    let loadDoneFont = await this.loadFonts();
                    let loadDoneImage = await this.loadImage();
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
            loadImage: async function(){
                try {
                    this.isAppReady = false;
                    await Expo.Asset.loadAsync([
                        require("./assets/images/avatar1.png"),
                        require("./assets/images/background-login.jpeg"),
                        require("./assets/images/background-login.svg"),
                        require("./assets/images/bao-tri-sua-chua.svg"),
                        require("./assets/images/bg.jpg"),
                        require("./assets/images/bg.svg"),
                        require("./assets/images/cac-loai-phi-khac.svg"),
                        require("./assets/images/cai-dat.gif"),
                        require("./assets/images/caidat.svg"),
                        require("./assets/images/dang-xuat.svg"),
                        require("./assets/images/dangkidichvu.svg"),
                        require("./assets/images/dich-vu.gif"),
                        require("./assets/images/dichvu.svg"),
                        require("./assets/images/drawer-cover.png"),
                        require("./assets/images/expo-wordmark.png"),
                        require("./assets/images/hoadondiennuoc.svg"),
                        require("./assets/images/img-01.jpg"),
                        require("./assets/images/img-02.jpg"),
                        require("./assets/images/img-03.jpg"),
                        require("./assets/images/logo.png"),
                        require("./assets/images/phananhgopy.svg"),
                        require("./assets/images/side-bar.jpg"),
                        require("./assets/images/thay-doi-pass.svg"),
                        require("./assets/images/thong-bao.gif"),
                        require("./assets/images/thong-bao-chung.svg"),
                        require("./assets/images/thong-bao-phi-dich-vu.svg"),
                        require("./assets/images/thong-tin-kh.svg"),
                        require("./assets/images/thong-tin-phi-ql.svg"),
                        require("./assets/images/thong-tin-ung-dung.svg"),
                        require("./assets/images/thongbao.svg"),
                        require("./assets/images/thongtinbanquanly.svg"),
                        require("./assets/images/tien-do-dich-vu.svg"),
                        require("./assets/images/tra-cuu.gif"),
                        require("./assets/images/tracuu.svg"),
                        require("./assets/images/trangchu.svg"),
                    ]);
                    this.isAppReady = true;
                } catch (error) {
                    console.log("some error occured", error);
                    this.isAppReady = true;
                }
            },
            loadInfoUserIfExists: function(name){
                localStorage.checkFileOrDirectoryExists(name).then((value) => {
                    if(value.exists === true){
                        localStorage.readFile(name).then((ObjInforUser) => {
                            if(ObjInforUser){
                                console.log(typeof JSON.parse(ObjInforUser));
                                this.saveInforUser(JSON.parse(ObjInforUser));
                            }
                        });



                    }else{
                        console.log("chưa có file user được ghi vào local");
                    }
                }).catch((error) => {
                    console.log("co loi phat sinh "+ error);
                })
            }
        }
    };
</script>
<style>
    .container {
        flex: 1;
    }

</style>
