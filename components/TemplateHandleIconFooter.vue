<template>
    <view class="service">
        <component v-if="getData.components.listinforuser.status" :is="'ListInforUser'" ></component>
        <component v-if="getData.components.feedback.status" :is="'FeedBack'" ></component>
        <component v-if="getData.components.applicationinformation.status" :is="'ApplicationInformation'" :objApplicationInformation="objApplicationInformation"></component>
        <component v-if="getData.components.changepassword.status" :is="'ChangePassword'"></component>
        <component v-if="getData.components.bill.status" :is="'Bill'"></component>
        <component v-if="getData.components.billelectricandwater.status" :is="'BillElectricAndWater'"></component>
        <component v-if="getData.components.billanother.status" :is="'BillAnother'"></component>
        <component v-if="getData.components.registerservice.status" :is="'RegisterService'"></component>
        <component v-if="getData.components.notifydetail.status" :is="'NotifyDetail'" :navigation="navigation" :todo="getData.components.notifydetail.data"></component>
    </view>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex';
    import getMonthYearinSearch from "../store/getMonthYearinSearch";
    import getDate from "../store/getDate";
    import FeedBack from "./Feedback.vue";
    import ListInforUser from "./ListInforUser.vue";
    import ApplicationInformation from "./ApplicationInformation.vue";
    import ChangePassword from "./ChangePassword.vue";
    import Bill from "./Bill.vue";
    import BillElectricAndWater from "./BillElectricAndWater.vue";
    import BillAnother from "./BillAnother.vue";
    import RegisterService from "./RegisterService.vue";
    import NotifyDetail from "../components/NotifyDetail.vue";
    export default {
        props: {
            navigation: {
                type: Object
            }

        },
        data: function () {
            return {
                objApplicationInformation: {
                    title: "ỨNG DỤNG CHĂM SÓC KHÁCH HÀNG",
                    tableData: [
                        {id: 0, title: 'Quyền sở hũu:', noidung: 'Công ty Sao Kim'},
                        {id: 1, title: 'Nhà phát triển:', noidung: 'Venuscorp'},
                        {id: 2, title: 'Email liên hệ:', noidung: 'info@venuscorp.vn'},
                        {id: 3, title: 'Phiên bản ứng dụng:', noidung: '1.2'}
                    ],
                }
            };
        },
        created: function () {
            if(!this.$store._modulesNamespaceMap['getMonthYearinSearch/']){
                this.$store.registerModule('getMonthYearinSearch', getMonthYearinSearch);
            }
            if(!this.$store._modulesNamespaceMap['getDate/']){
                this.$store.registerModule('getDate', getDate);
            }
        },
        components: {
            FeedBack,
            ListInforUser,
            ApplicationInformation,
            ChangePassword,
            Bill,
            BillElectricAndWater,
            BillAnother,
            RegisterService,
            NotifyDetail
        },
        computed: {
            getData: function(){
                return this.getScreen();
            },
        },
        mounted: function () {
        },
        methods: {
            ...mapGetters("StoreScreenTemplateIconFooter", ["getScreen"]),
        }
    }
</script>
<style>
    .service {
        flex: 1;
        justify-content: center;
        align-items: center;
    }

</style>