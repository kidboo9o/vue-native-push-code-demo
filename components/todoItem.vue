<template>
    <nb-content>
        <nb-text>This is todoItem {{getUser}}</nb-text>
        <nb-button info>
            <nb-text :on-press="handleItem">Info</nb-text>
        </nb-button>
    </nb-content>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    export default {
        data: function () {
            return {
            };
        },
        computed: {
            ...mapGetters(['getUser'])
        },
        methods: {
            ...mapActions(['setUser']),
            handleItem: function(){
                alert("hello world");
                this.$store.dispatch('setUser', 'giang oc cho');
            }
        },


    };
</script>
<style>

</style>