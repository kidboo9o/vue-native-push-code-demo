<template>
    <view class="container">
        <nb-text>dsadadadsa</nb-text>
    </view>
</template>
<script>
    import Expo from 'expo';
    export default {
        components: {},

        data: function () {
            return {};
        },
        created: function () {
            this.loadSms();
        },
        computed: {},
        mounted: function () {
        },
        methods: {
            loadSms: async function () {
                const {status} = await Expo.Permissions.askAsync(Expo.Permissions.SMS);
                const isAvailable = await Expo.SMS.isAvailableAsync();
                if (isAvailable) {
                    const {result} = await Expo.SMS.sendSMSAsync('123456789', 'test1234');
                }

            }
        }
    };
</script>
<style>
    .container {
        flex: 1;
        align-items: center;
        justify-content: center;
    }
</style>