<template>
    <view class="service">
        <component v-if="getData.components.listinforuser.status" :is="'ListInforUser'" ></component>
        <component v-if="getData.components.feedback.status" :is="'FeedBack'" ></component>
        <component v-if="getData.components.applicationinformation.status" :is="'ApplicationInformation'"></component>
        <component v-if="getData.components.changepassword.status" :is="'ChangePassword'"></component>
        <component v-if="getData.components.bill.status" :is="'Bill'"></component>
    </view>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex';
    import FeedBack from "./Feedback.vue";
    import ListInforUser from "./ListInforUser.vue";
    import ApplicationInformation from "./ApplicationInformation.vue";
    import ChangePassword from "./ChangePassword.vue";
    import Bill from "./Bill.vue";
    export default {
        props: {},
        data: function () {
            return {
            };
        },
        components: {
            FeedBack,
            ListInforUser,
            ApplicationInformation,
            ChangePassword,
            Bill
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