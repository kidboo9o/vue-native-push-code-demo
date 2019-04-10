<template>
    <view class="content">
        <ItemContent v-for="todo in todoContents.data" :key="todo.id" :todo="todo"></ItemContent>
    </view>
</template>
<script>
    import ItemContent from './ItemContent.vue';
    import {mapGetters, mapActions} from 'vuex';
    export default {
        props: {},
        data: function () {
            return {
            };
        },
        created: function () {

        },
        components: {
            ItemContent,
        },
        computed: {
            todoContents: function(){
                return this.getContent();
            },
        },
        mounted: function () {
        },
        methods: {
            ...mapGetters("screenBaseOnFooter", ["getContent"]),
        },


    };
</script>
<style>
    .content {
        flex: 1;
    }

</style>