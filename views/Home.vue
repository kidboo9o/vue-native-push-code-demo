<template>
    <nb-container>
        <header-component :navigation="navigation"></header-component>
        <nb-content :scrollEnabled="getData.container.scroll.status">
            <component v-if="getData.components.navbar.status" :is="'NavBar'"></component>
            <component v-if="getData.components.carousel.status" :is="'CarouselComponent'"></component>
            <component v-if="getData.components.content.status" :is="'Content'"></component>
            <component v-if="getData.components.templatehandleiconfooter.status" :is="'TemplateHandleIconFooter'" ></component>
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
            this.setNavigation(this.navigation);
            this.saveScreen("Home");
        },
        methods: {
            ...mapGetters("screenBaseOnFooter", ["getScreenCurrent"]),
            ...mapActions("screenBaseOnFooter", ["saveScreen", "setNavigation"]),
        },


    };
</script>
<style>
</style>