<template>
    <nb-content>
        <nb-text>This is todoItem {{getUser}}</nb-text>
        <nb-button info>
            <nb-text :on-press="handleItem">Info</nb-text>
        </nb-button>
        <nb-text>Response duoc tra ve la {{response}}</nb-text>
    </nb-content>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex';
    import axios from 'axios';
    export default {
        data: function () {
            return {
                response: null,
            };
        },
        computed: {
            ...mapGetters(['getUser'])
        },
        mounted: function () {
            axios.get("https://api.coindesk.com/v1/bpi/currentprice/CNY.json")
                .then((response) => {
                    console.log("in ra response thu coi");
                    this.response = response.data;
                })
                .catch(function (error) {

                });
        },
        methods: {
            ...mapActions(['setUser']),
            handleItem: function () {
                alert("hello world");
                this.$store.dispatch('setUser', 'giang oc cho');
            }
        },


    };
</script>
<style>

</style>