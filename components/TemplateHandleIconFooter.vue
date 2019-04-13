<template>
    <view class="service">
        <component v-if="getData.components.listinforuser.status" :is="'ListInforUser'" ></component>
        <component v-if="getData.components.feedback.status" :is="'FeedBack'" ></component>
        <component v-if="getData.components.applicationinformation.status" :is="'ApplicationInformation'"></component>
    </view>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex';
    import FeedBack from "./Feedback.vue";
    import ListInforUser from "./ListInforUser.vue";
    import ApplicationInformation from "./ApplicationInformation.vue";
    export default {
        props: {},
        data: function () {
            return {
            };
        },
        components: {
            FeedBack,
            ListInforUser,
            ApplicationInformation
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