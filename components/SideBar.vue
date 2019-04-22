<template>
    <nb-container>
        <nb-content>
            <view :style="{position: 'relative'}">
                <AutoHeightImage
                        :source="require('../assets/images/side-bar.jpg')"
                        :width="screen.width"
                        :style="{flex: 1, resizeMode: 'stretch'}"
                ></AutoHeightImage>
                <nb-text v-if="isLogin === true" class="title" :style="{fontSize: scaleFontSize(18)}">
                    {{username}}
                </nb-text>
                <nb-text v-else class="title" :style="{fontSize: scaleFontSize(18)}">Chào mừng Quý khách</nb-text>
            </view>
            <ListItem v-if="isLogin === true" :todos="listItemLogin" :navigation="navigation"></ListItem>
            <ListItem v-else :todos="listItemNotLogin" :navigation="navigation"></ListItem>
        </nb-content>
        <FooterSidebar :todos="listItemFooter" :navigation="navigation"></FooterSidebar>
    </nb-container>
</template>
<script>
    import AutoHeightImage from 'react-native-auto-height-image';
    import LibCustom from '../library/custom';
    import ListItem from './ListItem.vue';
    import {mapGetters, mapActions} from 'vuex';
    import FooterSidebar from "./FooterSideBar.vue";
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
    const styleGeneralListItemFooter = {
        borderBottomWidth: 1,
        marginLeft: 0,
        paddingLeft: '10%',
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
            FooterSidebar,
        },
        computed: {},
        data: function () {
            return {
                screen: {
                    width: 0,
                    height: 0,
                },
                username: '',
                isLogin: '',
                listItemNotLogin: [
                    {
                        id: 0,
                        style: styleGeneralListItem,
                        route: 'Login',
                        left: {
                            style: {},
                            data: [
                                {
                                    id: 0,
                                    type: 'icon',
                                    icon: {
                                        type: 'FontAwesome',
                                        name: 'user-circle-o',
                                        style: {
                                            color: '#303f9f',
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
                                        title: 'Đăng nhập/Đăng ký',
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
                        name: "thong-tin-ung-dung",
                        style: styleGeneralListItem,
                        left: {
                            style: {},
                            data: [
                                {
                                    id: 0,
                                    type: 'icon',
                                    icon: {
                                        type: 'MaterialCommunityIcons',
                                        name: 'information-outline',
                                        style: {
                                            color: '#303f9f',
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
                                        title: 'Thông tin ứng dụng',
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
                listItemLogin: [
                    {
                        id: 0,
                        style: styleGeneralListItem,
                        name: "change-password",
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
                                            color: '#303f9f',
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
                        name: 'logout',
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
                                            color: '#303f9f',
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


                ],

                listItemFooter: [
                    {
                        id: 0,
                        style: styleGeneralListItemFooter,
                        left: {
                            style: {},
                            data: [
                                {
                                    id: 0,
                                    type: 'icon',
                                    icon: {
                                        type: 'Octicons',
                                        name: 'device-mobile',
                                        style: {
                                            color: '#303f9f',
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
                                        title: 'Phiên bản ứng dụng 1.2',
                                        style: {
                                            fontSize: textItem.fontSize,
                                            color: '#303f9f',
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
        created: function () {
            this.navigation.addListener("willBlur", () => {
                this.isLogin = this.checkLogin();
                if (this.isLogin) {
                    this.username = this.getUserName();
                }
            })
        },
        mounted: function () {
            this.screen = LibCustom.getSizeScreen();
        },
        methods: {
            ...mapGetters("login", ['checkLogin', 'getUserName']),
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
    .title {
        position: absolute;
        top: 70%;
        color: white;
        left: 0;
        padding-left: 17;
        margin-left: 17;
        right: 0;
        width: 100%;
        height: 100%;
        font-weight: bold;
    }

</style>