<template>
    <nb-container>
        <header-component :title="titleHeader" :navigation="navigation"></header-component>
        <nb-content>
            <NavBar :dataNavbar="dataNavbar"></NavBar>
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
                dataNavbar: {
                    style: {
                        height: LibCustom.viewScreen(30, 'vh')
                    },
                    row: [
                        {
                            id: 0,
                            style: {
                                paddingTop: LibCustom.viewScreen(3, 'vw'),
                                paddingBottom: LibCustom.viewScreen(3, 'vw')
                            },
                            data: [
                                {

                                    id: 0,
                                    style: {
                                        marginLeft: LibCustom.viewScreen(3, 'vw'),
                                        marginRight: LibCustom.viewScreen(3, 'vw'),
                                    },
                                    classObject: {
                                        'col-6': true,
                                    },
                                    data: {
                                        svg: {
                                            src: require('../assets/images/thongtinbanquanly.svg'),
                                            width: LibCustom.viewScreen(50, 'vw'),
                                            height: LibCustom.viewScreen(8, 'vh'),
                                        },
                                        text: {
                                            style: {
                                                fontSize: LibCustom.scaleFontSize(12)
                                            },
                                            title: "Thông báo từ ban quản lý"

                                        }
                                    }

                                },

                                {

                                    id: 1,
                                    style: {
                                        marginRight: LibCustom.viewScreen(3, 'vw'),
                                    },
                                    classObject: {
                                        'col-6': true,
                                    },
                                    data: {
                                        svg: {
                                            src: require('../assets/images/hoadondiennuoc.svg'),
                                            width: LibCustom.viewScreen(45, 'vw'),
                                            height: LibCustom.viewScreen(8, 'vh'),
                                        },
                                        text: {
                                            style: {
                                                fontSize: LibCustom.scaleFontSize(12)
                                            },
                                            title: "Hóa đơn điện nước"

                                        }
                                    }

                                }
                            ]
                        },

                        {
                            id: 1,
                            style: {
                                paddingBottom: LibCustom.viewScreen(3, 'vw')
                            },
                            data: [
                                {

                                    id: 0,
                                    style: {
                                        marginLeft: LibCustom.viewScreen(3, 'vw'),
                                        marginRight: LibCustom.viewScreen(3, 'vw'),
                                    },
                                    classObject: {
                                        'col-6': true,
                                    },
                                    data: {
                                        svg: {
                                            src: require('../assets/images/phananhgopy.svg'),
                                            width: LibCustom.viewScreen(45, 'vw'),
                                            height: LibCustom.viewScreen(8, 'vh'),
                                        },
                                        text: {
                                            style: {
                                                fontSize: LibCustom.scaleFontSize(12)
                                            },
                                            title: "Phản ánh góp ý"

                                        }
                                    }

                                },

                                {

                                    id: 1,
                                    style: {
                                        marginRight: LibCustom.viewScreen(3, 'vw'),
                                    },
                                    classObject: {
                                        'col-6': true,
                                    },
                                    data: {
                                        svg: {
                                            src: require('../assets/images/dangkidichvu.svg'),
                                            width: LibCustom.viewScreen(45, 'vw'),
                                            height: LibCustom.viewScreen(8, 'vh'),
                                        },
                                        text: {
                                            style: {
                                                fontSize: LibCustom.scaleFontSize(12)
                                            },
                                            title: "Đăng kí dịch vụ"

                                        }
                                    }

                                }
                            ]
                        }
                    ]
                }
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