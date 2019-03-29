<template>
    <view v-for="todo in todos" :key="todo.id">
        <Item :todo="todo" :navigation="navigation"></Item>
    </view>
</template>
<script>
    import Item from '../components/Item.vue';
    export default {
        props: {
            todos: Array,
            navigation: {
                type: Object
            }
        },
        components: {
            Item,
        },
        computed: {},
        data: function () {
            return {};
        },
        mounted: function () {
        },
        methods: {},


    };
</script>
<style>

</style>