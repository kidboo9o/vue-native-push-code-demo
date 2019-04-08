<template>
    <nb-container>
        <header-component :navigation="navigation"></header-component>
        <nb-content>
           <Content></Content>
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
            },
            getContent: function(){
                return this.todoContents;
            }
        },
        data: function () {
            return {
                screen: {
                    width: 0,
                    height: 0,
                },
                todoContents: [
                    {
                        id: 0,
                        editable: false,
                        allowEditable: false,
                        image: {
                            src: require('../assets/images/img-01.jpg'),
                            width: 0,
                            height: 0,
                            scale: 0,
                        },
                        data: {
                            title: 'Cty venus ',
                            description: 'Cty venus',
                            time: '30 minutes'
                        }
                    },
                    {
                        id: 1,
                        editable: false,
                        allowEditable: false,
                        image: {
                            src: require('../assets/images/img-02.jpg'),
                            width: 0,
                            height: 0,
                            scale: 0,
                        },
                        data: {
                            title: 'Cty venus',
                            description: 'Cty venus',
                            time: '30 minutes'
                        }
                    },
                    {
                        id: 2,
                        editable: false,
                        allowEditable: false,
                        image: {
                            src: require('../assets/images/img-03.jpg'),
                            width: 0,
                            height: 0,
                        },
                        data: {
                            title: 'Cty venus',
                            description: 'Cty venus',
                            time: '30 minutes'
                        }
                    },
                    {
                        id: 3,
                        editable: false,
                        allowEditable: false,
                        image: {
                            src: require('../assets/images/background-login.jpeg'),
                            width: 0,
                            height: 0,
                        },
                        data: {
                            title: 'Cty venus',
                            description: 'Cty venus',
                            time: '30 minutes'
                        }
                    },
                    {
                        id: 4,
                        editable: false,
                        allowEditable: false,
                        image: {
                            src: require('../assets/images/side-bar.jpg'),
                            width: 0,
                            height: 0,
                        },
                        data: {
                            title: 'Cty venus',
                            description: 'Cty venus',
                            time: '30 minutes'
                        }
                    }
                ]

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