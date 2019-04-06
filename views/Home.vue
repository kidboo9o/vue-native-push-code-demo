<template>
    <nb-container>
        <header-component :navigation="navigation"></header-component>
        <nb-content>
            <component v-if="getData.components.navbar.status" :is="'NavBar'"></component>
            <component v-if="getData.components.carousel.status" :is="'CarouselComponent'"></component>
            <component v-if="getData.components.content.status" :is="'Content'"></component>
        </nb-content>
        <footer-component :navigation="navigation"></footer-component>
    </nb-container>
</template>
<script>
    import LibCustom from '../library/custom';
    import headerComponent from '../components/Header.vue';
    import NavBar from '../components/Navbar.vue';
    import footerComponent from '../components/Footer.vue';
    import CarouselComponent from '../components/Carousel.vue';
    import Content from '../components/Content.vue';
    import screenBaseOnFooter from "../store/ScreenBaseOnFooter";
    import {mapGetters, mapActions} from 'vuex';
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
            Content
        },
        computed: {
            getData: function(){
                return this.getScreenCurrent();
            }
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
            this.screen = LibCustom.getSizeScreen();
            this.saveScreen("Home");
        },
        methods: {
            ...mapGetters("screenBaseOnFooter", ["getScreenCurrent"]),
            ...mapActions("screenBaseOnFooter", ["saveScreen"]),
            scaleFontSize: function (size) {
                return LibCustom.scaleFontSize(size);
            },
            viewScreen: function (percent, type, minus = 0) {
                return LibCustom.viewScreen(percent, type, minus);
            },
        },


    };
</script>
<style>
</style>