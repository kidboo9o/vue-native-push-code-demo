<template>
    <nb-footer :style="{height: viewScreen(11, 'vh')}">
        <nb-footer-tab class="footer">
            <view class="row">
                <touchable-opacity class="col-2" v-for="todo in itemsFooter" :key="todo.id"
                                   :on-press="() => handleClick(todo.id)">
                    <view>
                        <SvgUri
                                :source="todo.src"
                                :width="viewScreen(18, 'vw')"
                                :height="viewScreen(6, 'vh')"
                                :fill="todo.id === itemChecked ? '#546EFF' : '#919191'"

                        />
                        <nb-text class="text-center"
                                 :style="{
                                    fontSize: scaleFontSize(12),
                                    color: todo.id === itemChecked ? '#546EFF' : '#919191'
                                }"
                        >{{todo.title}}
                        </nb-text>
                    </view>

                </touchable-opacity>


            </view>
        </nb-footer-tab>
    </nb-footer>
</template>
<script>
    import LibCustom from '../library/custom';
    import SvgUri from 'react-native-svg-uri';
    import {mapGetters, mapActions} from 'vuex';
    export default {
        props: {
            path: {
                type: String
            },
            navigation: {
                type: Object
            }
        },
        components: {
            SvgUri
        },
        data: function () {
            return {
                screen: {
                    width: 0,
                    height: 0,
                },
                itemChecked: -1,
                itemsFooter: [
                    {
                        id: 0,
                        src: require('../assets/images/trangchu.svg'),
                        title: 'Trang chủ',
                        route: 'Home',
                    },
                    {
                        id: 1,
                        src: require('../assets/images/thongbao.svg'),
                        title: 'Tin tức',
                        route: '',
                    },
                    {
                        id: 2,
                        src: require('../assets/images/dichvu.svg'),
                        title: 'Dịch vụ',
                        route: '',
                    },
                    {
                        id: 3,
                        src: require('../assets/images/tracuu.svg'),
                        title: 'Tra cứu',
                        route: '',
                    },
                    {
                        id: 4,
                        src: require('../assets/images/caidat.svg'),
                        title: 'Cài đặt',
                        route: '',
                    }
                ]
            };
        },
        computed: {},
        mounted: function () {
            this.screen = LibCustom.getSizeScreen();
            this.itemChecked = this.setFocusItem(this.path);
        },
        methods: {
            ...mapGetters("screenBaseOnFooter", []),
            ...mapActions("screenBaseOnFooter",
                ['disableComponent','enableComponent','setTitleHeader', 'setRowDataNavbar', 'setStyleNavbar']),
            scaleFontSize: function (size) {
                return LibCustom.scaleFontSize(size);
            },
            viewScreen: function (percent, type, minus = 0) {
                return LibCustom.viewScreen(percent, type, minus);
            },
            handleClick: function (key) {
                let rowData;
                switch (key) {
                    case 0 :
                        this.setTitleHeader("Venus DVKH");
                        this.enableComponent(['navbar', 'carousel', 'content']);
                        rowData = [
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
                                                height: LibCustom.viewScreen(6, 'vh'),
                                            },
                                            text: {
                                                style: {
                                                    fontSize: LibCustom.scaleFontSize(12)
                                                },
                                                title: "Thông báo"

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
                                                height: LibCustom.viewScreen(6, 'vh'),
                                            },
                                            text: {
                                                style: {
                                                    fontSize: LibCustom.scaleFontSize(12)
                                                },
                                                title: "Phí dịch vụ"

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
                                                height: LibCustom.viewScreen(6, 'vh'),
                                            },
                                            text: {
                                                style: {
                                                    fontSize: LibCustom.scaleFontSize(12)
                                                },
                                                title: "Góp ý"

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
                                                height: LibCustom.viewScreen(6, 'vh'),
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
                        ];
                        this.setRowDataNavbar(rowData);
                        break;
                    case 1 :
                        this.disableComponent(['carousel', 'content']);
                        this.setTitleHeader("Tin tức");
                        break;

                    case 2 :
                        this.disableComponent(['carousel', 'content']);
                        this.setTitleHeader("Dịch vụ");
                        rowData = [
                            {
                                id: 0,
                                style: {
                                    paddingTop: LibCustom.viewScreen(3, 'vw'),
                                    paddingBottom: LibCustom.viewScreen(3, 'vw'),
                                },
                                data: [
                                    {

                                        id: 0,
                                        style: {
                                            marginLeft: LibCustom.viewScreen(3, 'vw'),
                                            marginRight: LibCustom.viewScreen(3, 'vw'),
                                        },
                                        classObject: {
                                            'col-12': true,
                                        },
                                        data: {
                                            svg: {
                                                src: require('../assets/images/dangkidichvu.svg'),
                                                width: LibCustom.viewScreen(100, 'vw'),
                                                height: LibCustom.viewScreen(8, 'vh'),
                                            },
                                            text: {
                                                style: {
                                                    fontSize: LibCustom.scaleFontSize(12)
                                                },
                                                title: "Đăng kí dịch vụ"

                                            }
                                        }
                                    },
                                ]
                            },
                            {
                                id: 1,
                                style: {
                                    paddingBottom: LibCustom.viewScreen(3, 'vw'),
                                },
                                data: [
                                    {

                                        id: 0,
                                        style: {
                                            marginLeft: LibCustom.viewScreen(3, 'vw'),
                                            marginRight: LibCustom.viewScreen(3, 'vw'),
                                            paddingLeft: '2.5%',
                                        },
                                        classObject: {
                                            'col-12': true,
                                        },
                                        data: {
                                            svg: {
                                                src: require('../assets/images/phananhgopy.svg'),
                                                width: LibCustom.viewScreen(100, 'vw'),
                                                height: LibCustom.viewScreen(8, 'vh'),
                                            },
                                            text: {
                                                style: {
                                                    fontSize: LibCustom.scaleFontSize(12),
                                                    paddingRight: '3%',
                                                },
                                                title: "Góp ý"

                                            }
                                        }
                                    },
                                ]
                            },
                        ];
                        this.setRowDataNavbar(rowData);
                        break;

                    case 3 :
                        this.disableComponent(['carousel', 'content']);
                        this.setTitleHeader("Tra cứu");
                        rowData = [
                            {
                                id: 0,
                                style: {
                                    paddingTop: LibCustom.viewScreen(3, 'vw'),
                                    paddingBottom: LibCustom.viewScreen(3, 'vw'),
                                },
                                data: [
                                    {

                                        id: 0,
                                        style: {
                                            marginLeft: LibCustom.viewScreen(3, 'vw'),
                                            marginRight: LibCustom.viewScreen(3, 'vw'),
                                        },
                                        classObject: {
                                            'col-12': true,
                                        },
                                        data: {
                                            svg: {
                                                src: require('../assets/images/dangkidichvu.svg'),
                                                width: LibCustom.viewScreen(100, 'vw'),
                                                height: LibCustom.viewScreen(8, 'vh'),
                                            },
                                            text: {
                                                style: {
                                                    fontSize: LibCustom.scaleFontSize(12)
                                                },
                                                title: "Đăng kí dịch vụ"

                                            }
                                        }
                                    },
                                ]
                            },
                            {
                                id: 1,
                                style: {
                                    paddingBottom: LibCustom.viewScreen(3, 'vw'),
                                },
                                data: [
                                    {

                                        id: 0,
                                        style: {
                                            marginLeft: LibCustom.viewScreen(3, 'vw'),
                                            marginRight: LibCustom.viewScreen(3, 'vw'),
                                            paddingLeft: '2.5%',
                                        },
                                        classObject: {
                                            'col-12': true,
                                        },
                                        data: {
                                            svg: {
                                                src: require('../assets/images/phananhgopy.svg'),
                                                width: LibCustom.viewScreen(100, 'vw'),
                                                height: LibCustom.viewScreen(8, 'vh'),
                                            },
                                            text: {
                                                style: {
                                                    fontSize: LibCustom.scaleFontSize(12),
                                                    paddingRight: '3%',
                                                },
                                                title: "Góp ý"

                                            }
                                        }
                                    },
                                ]
                            },
                            {
                                id: 2,
                                style: {
                                    paddingBottom: LibCustom.viewScreen(3, 'vw'),
                                },
                                data: [
                                    {

                                        id: 0,
                                        style: {
                                            marginLeft: LibCustom.viewScreen(3, 'vw'),
                                            marginRight: LibCustom.viewScreen(3, 'vw'),
                                            paddingLeft: '2.5%',
                                        },
                                        classObject: {
                                            'col-12': true,
                                        },
                                        data: {
                                            svg: {
                                                src: require('../assets/images/phananhgopy.svg'),
                                                width: LibCustom.viewScreen(100, 'vw'),
                                                height: LibCustom.viewScreen(8, 'vh'),
                                            },
                                            text: {
                                                style: {
                                                    fontSize: LibCustom.scaleFontSize(12),
                                                    paddingRight: '3%',
                                                },
                                                title: "Góp ý"

                                            }
                                        }
                                    },
                                ]
                            },
                        ];
                        this.setRowDataNavbar(rowData);
                        let styleNavbar = { height: LibCustom.viewScreen(60, 'vh')};
                        this.setStyleNavbar(styleNavbar);
                        break;

                    case 4 :
                        this.disableComponent(['navbar','carousel', 'content']);
                        this.setTitleHeader("Cài đặt");
                        break;

                }
                this.itemChecked = key;
            },
            setFocusItem: function (path) {
                let index = -1;
                switch (path) {
                    case "Home" :
                        index = 0;
                        break;
                    case "TinTuc" :
                        index = 1;
                        break;
                    case "DichVu" :
                        index = 2;
                        break;
                    case "TraCuu" :
                        index = 3;
                        break;
                    case "CaiDat" :
                        index = 4;
                        break;
                    default:
                        alert("thông tin truyền vào footer không hợp lệ");
                        break;
                }
                return index;
            },

        },


    };
</script>
<style>
    .footer {
        flex: 1;
        align-items: flex-end;
        background-color: black;
    }

    .row {
        flex: 1;
        flex-direction: row;
        background-color: white;
        padding-top: 2.5%;
        padding-bottom: 2.5%;
    }

    .col-2 {
        width: 20%;
    }

    .text-center {
        text-align: center;
        padding-right: 8%;
    }


</style>