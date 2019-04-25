<template>
    <nb-container class="mt-24-fixed">
        <header-component :navigation="navigation"></header-component>
        <nb-content :scrollEnabled="getData.container.scroll.status" :style="getData.container.style">
            <component v-if="getData.components.navbar.status" :is="'NavBar'" :navigation="navigation"></component>
            <component v-if="getData.components.carousel.status" :is="'CarouselComponent'"></component>
            <component v-if="getData.components.content.status" :is="'Content'"></component>
            <component v-if="getData.components.templatehandleiconfooter.status" :is="'TemplateHandleIconFooter'" :navigation="navigation" ></component>
        </nb-content>
        <footer-component :navigation="navigation"></footer-component>
    </nb-container>
</template>
<script>
    import headerComponent from '../components/Header.vue';
    import NavBar from '../components/Navbar.vue';
    import footerComponent from '../components/Footer.vue';
    import CarouselComponent from '../components/Carousel.vue';
    import Content from '../components/Content.vue';
    import screenBaseOnFooter from "../store/ScreenBaseOnFooter";
    import {mapGetters, mapActions} from 'vuex';
    import TemplateHandleIconFooter from '../components/TemplateHandleIconFooter.vue';
    export default {
        props: {
            navigation: {
                type: Object
            }
        },
        created: function () {
            if(!this.$store._modulesNamespaceMap['screenBaseOnFooter/']){
                this.$store.registerModule('screenBaseOnFooter', screenBaseOnFooter);
            }
        },
        components: {
            headerComponent,
            NavBar,
            footerComponent,
            CarouselComponent,
            Content,
            TemplateHandleIconFooter,
        },
        computed: {
            getData: function(){
                return this.getScreenCurrent();
            },
        },
        data: function () {
            return {
                screen: {
                    width: 0,
                    height: 0,
                },
            };
        },
        mounted: function () {
            this.setListStep("Home");
            this.saveScreen("Home");
        },
        methods: {
            ...mapGetters("screenBaseOnFooter", ["getScreenCurrent"]),
            ...mapActions("screenBaseOnFooter", ["saveScreen", "setListStep"]),
        },


    };
</script>
<style>
    .mt-24-fixed{
        margin-top: 24;
    }
</style>