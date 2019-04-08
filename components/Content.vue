<template>
    <view class="content">
        <ItemContent v-for="todo in todoContents" :key="todo.id" :todo="todo"></ItemContent>
    </view>
</template>
<script>
    import ItemContent from './ItemContent.vue';
    export default {
        props: {
            todoContents:{
                type: Array,
            }
        },
        data: function () {
            return {
            };
        },
        created: function () {

        },
        components: {
            ItemContent
        },
        computed: {},
        mounted: function () {
        },
        methods: {
        },


    };
</script>
<style>
    .content {
        flex: 1;
    }
</style>