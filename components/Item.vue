<template>
    <nb-list-item icon :style="todo.style" :on-press="handleClick">
        <nb-left>
            <nb-icon :type="todo.left.data[0].icon.type" :name="todo.left.data[0].icon.name"
                     :style="todo.left.data[0].icon.style"/>
        </nb-left>
        <nb-body :style="todo.body.style">
            <nb-text :style="todo.body.data[0].text.style">{{todo.body.data[0].text.title}}</nb-text>
        </nb-body>
    </nb-list-item>
</template>
<script>
    export default {
        props: {
            todo: Object,
            navigation: {
                type: Object
            }
        },

        computed: {},
        data: function () {
            return {};
        },
        mounted: function () {

        },
        methods: {
            handleClick: function () {
                alert("hello")
            },

        },


    };
</script>
<style>

</style>