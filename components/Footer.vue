<template>
    <nb-footer :style="{height: viewScreen(11, 'vh')}">
        <nb-footer-tab class="footer">
            <view class="row" >
                    <touchable-opacity class="col-2" v-for="todo in itemsFooter" :key="todo.id" :on-press="() => handleClick(todo.id)">
                        <SvgUri
                                :source="todo.src"
                                :width="viewScreen(18, 'vw')"
                                :height="viewScreen(6, 'vh')"

                        />
                        <nb-text class="text-center text-color" :style="{fontSize: scaleFontSize(12)}"
                        >{{todo.title}}
                        </nb-text>
                    </touchable-opacity >
            </view>
        </nb-footer-tab>
    </nb-footer>
</template>
<script>
    import LibCustom from '../library/custom';
    import SvgUri from 'react-native-svg-uri';
    export default {
        props: {
            ishome: {
                type: Boolean
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
                itemsFooter: [
                    {
                        id: 0,
                        src: require('../assets/images/trangchu.svg'),
                        title: 'Trang chủ',
                        route: '',
                        isChecked: false,
                    },
                    {
                        id: 1,
                        src: require('../assets/images/thongbao.svg'),
                        title: 'Thông báo',
                        route: '',
                        isChecked: false,
                    },
                    {
                        id: 2,
                        src: require('../assets/images/dichvu.svg'),
                        title: 'Dịch vụ',
                        route: '',
                        isChecked: false,
                    },
                    {
                        id: 3,
                        src: require('../assets/images/tracuu.svg'),
                        title: 'Tra cứu',
                        route: '',
                        isChecked: false,
                    },
                    {
                        id: 4,
                        src: require('../assets/images/caidat.svg'),
                        title: 'Cài đặt',
                        route: '',
                        isChecked: false,
                    }
                ]
            };
        },
        computed: {},
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
            handleClick: function (key) {
                alert("ban vua click vao key "+key);

            }
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

    .text-color {
        color: #4d4d4d;
    }

    .text-color-focus {
        color: #546EFF;
    }
</style>