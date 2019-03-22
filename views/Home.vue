<template>
    <nb-container>
        <nb-header>
        </nb-header>
        <nb-content padder>
            <nb-text>Hello World {{getUser}}</nb-text>
            <todo-item></todo-item>
        </nb-content>
    </nb-container>
</template>
<script>
    import {Constants, MapView, Permissions, Location} from "expo";
    import TodoItem from '../components/todoItem.vue';
    import { mapGetters, mapActions } from 'vuex';
    export default {
        props: {
            navigation: {
                type: Object
            }
        },
        components: {
            TodoItem,
        },
        computed: {
            ...mapGetters(['getUser'])
        },
        data: function () {
            return {
            };
        },
        methods: {},


    };
</script>
<style>

</style>