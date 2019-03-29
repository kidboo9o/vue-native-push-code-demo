<template>
    <nb-container>
        <header-component :title="titleHeader" :navigation="navigation"></header-component>
        <nb-content >
            <NavBar></NavBar>
            <CarouselComponent></CarouselComponent>
            <Content></Content>
        </nb-content>
        <footer-component :ishome="isHome"></footer-component>
    </nb-container>
</template>
<script>
    import LibCustom from '../library/custom';
    import headerComponent from '../components/Header.vue';
    import NavBar from '../components/Navbar.vue';
    import footerComponent from '../components/Footer.vue';
    import CarouselComponent from '../components/Carousel.vue';
    import Content from '../components/Content.vue';
    export default {
        props: {
            navigation: {
                type: Object
            }
        },
        components: {
            headerComponent,
            NavBar,
            footerComponent,
            CarouselComponent,
            Content
        },
        computed: {},
        data: function () {
            return {
                titleHeader: 'Venus DVKH',
                screen: {
                    width: 0,
                    height: 0,
                },
                isHome: true,
            };
        },
        mounted: function () {
            this.screen = LibCustom.getSizeScreen();
        },
        methods: {
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