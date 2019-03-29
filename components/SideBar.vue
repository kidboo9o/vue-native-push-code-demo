<template>
    <nb-container>
        <nb-content>
            <AutoHeightImage
                    :source="require('../assets/images/side-bar.jpg')"
                    :width="screen.width"
                    :style="{flex: 1, resizeMode: 'stretch'}"
            ></AutoHeightImage>
            <ListItem :todos="listItem" :navigation="navigation"></ListItem>
        </nb-content>
    </nb-container>
</template>
<script>
    import AutoHeightImage from 'react-native-auto-height-image';
    import LibCustom from '../library/custom';
    import ListItem from './ListItem.vue';
    const styleGeneralListItem = {
            borderBottomWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderTopWidth: 0,
            marginLeft: 0,
            paddingLeft: '10%',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1,
            elevation: 1,

            height: LibCustom.viewScreen(8, 'vh'),
    };
    const iconItem = {
        fontSize: LibCustom.scaleFontSize(20),
        width: LibCustom.viewScreen(5, 'vw'),
    }
    const textItem = {
        fontSize: LibCustom.scaleFontSize(14),
    }
    export default {
        props: {
            navigation: {
                type: Object
            }
        },
        components: {
            AutoHeightImage,
            ListItem,
        },
        computed: {},
        data: function () {
            return {
                screen: {
                    width: 0,
                    height: 0,
                },
                listItem: [
                    {
                        id: 0,
                        style: styleGeneralListItem,
                        left: {
                            style: {},
                            data: [
                                {
                                    id: 0,
                                    type: 'icon',
                                    icon: {
                                        type: 'MaterialIcons',
                                        name: 'lock-outline',
                                        style: {
                                            color: 'blue',
                                            fontSize: iconItem.fontSize,
                                            width: iconItem.width,
                                        }
                                    },
                                },
                            ],
                        },
                        body: {
                            style: {
                                borderBottomWidth: 0,
                            },
                            data: [
                                {
                                    id: 0,
                                    type: 'text',
                                    text: {
                                        title: 'Thay đỗi mật khẩu',
                                        style: {
                                            fontSize: textItem.fontSize,
                                        }
                                    }
                                }
                            ],
                        },
                        right: {}
                    },
                    {
                        id: 1,
                        style: styleGeneralListItem,
                        left: {
                            style: {},
                            data: [
                                {
                                    id: 0,
                                    type: 'icon',
                                    icon: {
                                        type: 'MaterialCommunityIcons',
                                        name: 'exit-to-app',
                                        style: {
                                            color: 'blue',
                                            fontSize: iconItem.fontSize,
                                            width: iconItem.width,
                                        }
                                    },
                                },
                            ],
                        },
                        body: {
                            style: {
                                borderBottomWidth: 0
                            },
                            data: [
                                {
                                    id: 0,
                                    type: 'text',
                                    text: {
                                        title: 'Đăng xuất',
                                        style: {
                                            fontSize: textItem.fontSize,
                                        }
                                    }
                                }
                            ],
                        },
                        right: {}
                    },

                    {
                        id: 2,
                        style: styleGeneralListItem,
                        route: 'Login',
                        left: {
                            style: {},
                            data: [
                                {
                                    id: 0,
                                    type: 'icon',
                                    icon: {
                                        type: 'MaterialIcons',
                                        name: 'lock-outline',
                                        style: {
                                            color: 'blue',
                                            fontSize: iconItem.fontSize,
                                            width: iconItem.width,
                                        }
                                    },
                                },
                            ],
                        },
                        body: {
                            style: {
                                borderBottomWidth: 0,
                            },
                            data: [
                                {
                                    id: 0,
                                    type: 'text',
                                    text: {
                                        title: 'Đăng nhập',
                                        style: {
                                            fontSize: textItem.fontSize,
                                        }
                                    }
                                }
                            ],
                        },
                        right: {}
                    },
                ],
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