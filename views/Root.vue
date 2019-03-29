<template>
    <view class="container">
        <app-navigation></app-navigation>
    </view>
</template>
<script>
    import {AppNavigation} from "./routes";
    export default {
        components: {AppNavigation},
        data: function() {
            return {
            };
        },
        created: function(){
        },
        computed: {},
        methods: {

        }
    };
</script>
<style>
    .container {
        flex: 1;
    }
</style>