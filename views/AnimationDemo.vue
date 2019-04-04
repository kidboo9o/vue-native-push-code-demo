<template>
    <nb-container>
        <nb-content>
            <component :is="'audeptrai'"></component>
        </nb-content>
    </nb-container>
</template>
<script>
    import audeptrai from '../components/audeptrai.vue';
    export default {
        components: {
            audeptrai,
        },
        data: function() {
            return {
            };
        },

    };
</script>
<style>
    .container {
        background-color: #fff;
        align-items: center;
        justify-content: center;
        flex: 1;
    }
    .button-container {
        padding-top: 20;
    }
</style>