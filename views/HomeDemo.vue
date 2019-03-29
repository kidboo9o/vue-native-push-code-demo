<template>
    <nb-container>
        <header-component :title="titleHeader" :navigation="navigation"></header-component>
    </nb-container>
</template>
<script>
    import headerComponent from '../components/Header.vue';
    export default {
        props: {
            navigation: {
                type: Object
            }
        },
        components: {
            headerComponent,
        },
        computed: {

        },
        data: function () {
            return {
                titleHeader: 'Venus DVKH',
            };
        },
        methods: {},


    };
</script>
<style>

</style>