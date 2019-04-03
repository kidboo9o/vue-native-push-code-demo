<template>
    <nb-footer>
        <nb-footer-tab class="footer">
            <nb-content>
                <view v-for="todo in todos" :key="todo.id">
                    <Item :todo="todo" :navigation="navigation"></Item>
                </view>
            </nb-content>
        </nb-footer-tab>
    </nb-footer>
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
        computed: {},
        data: function () {
            return {
                todo: {

                }
            };
        },
        components:{
            Item,
        },
        mounted: function () {


        },
        methods: {

        },


    };
</script>
<style>
    .footer{
        background-color: lightgrey;
    }
</style>