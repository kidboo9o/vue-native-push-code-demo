<template>
    <view v-if="getType === 'full'">
        <view v-if="isShowModalConvertAccount">
            <modal :transparent="true" :animationType="'slide'">
                <view class="modal">
                    <view :style="{justifyContent: 'center', alignItems: 'center', height: viewScreen(85,'vh')}">
                        <view class="modal-container" :style="{height: viewScreen(50, 'vh')}">
                            <view class="modal-header">
                                <nb-text class="text-success" :style="{fontSize: scaleFontSize(16)}">
                                    Chuyển đổi tài khoản
                                </nb-text>
                            </view>
                            <scroll-view :showsVerticalScrollIndicator="true">
                                <touchable-opacity v-for="(todo,index) in getInforUser" :key="todo.id" class="p-20"
                                                   :style="{
                                                        backgroundColor: checkOdd(index) ? 'rgba(0,0,0,0.1)' : 'white',
                                                   }"
                                                   :on-press="() => handleChooseAccount(index)"
                                >
                                    <nb-text class="text-bold" :style="{fontSize: scaleFontSize(16)}">{{todo.ten_khang}}
                                    </nb-text>
                                    <nb-text :style="{fontSize: scaleFontSize(12)}">{{todo.diachi_duan}}</nb-text>
                                    <nb-text class="text-bold text-id" :style="{fontSize: scaleFontSize(12)}">
                                        Mã: {{todo.ma_canho}}
                                    </nb-text>
                                </touchable-opacity>
                            </scroll-view>

                        </view>
                    </view>
                </view>
            </modal>
        </view>
        <view class="header"
              :style="{
                    height: viewScreen(20, 'vh')
              }"
        >
            <view class="overlay">
                <AutoHeightImage
                        :source="require('../assets/images/side-bar.jpg')"
                        :width="screen.width"
                        :style="{flex: 1, resizeMode: 'stretch'}"
                ></AutoHeightImage>
            </view>
            <view class="row">
                <view class="col-4 text-center">
                    <touchable-opacity :on-press="handleConvertAccount">
                        <view class="avatar"
                              :style="{
                                width: viewScreen(14, 'vh'),
                                height: viewScreen(14, 'vh'),

                          }"
                        >
                            <AutoHeightImage
                                    :source="require('../assets/images/avatar1.png')"
                                    :width="'100%'"
                                    :style="{
                                    flex: 1,
                                    resizeMode: 'contain',
                                    borderRadius: screen.width+screen.height/2,
                                    borderWidth: 1
                                }"
                            ></AutoHeightImage>
                        </view>
                    </touchable-opacity>
                </view>
                <view class="col-8" :style="{justifyContent: 'center', height: viewScreen(20, 'vh')}">
                    <nb-text class="text-bold text-light" :style="{fontSize: scaleFontSize(16)}">
                        {{getUserDefault.ten_khang}}
                    </nb-text>
                    <nb-text class="text-light" :style="{fontSize: scaleFontSize(12)}">{{getUserDefault.diachi_duan}}
                    </nb-text>
                    <nb-text class="text-bold text-id" :style="{fontSize: scaleFontSize(12)}">
                        Mã: {{getUserDefault.ma_canho}}
                    </nb-text>
                </view>
            </view>
        </view>
    </view>
    <view v-else-if="getType === 'brief'">
        <view class="header"
              :style="{
    height: viewScreen(20, 'vh')
    }"
        >
            <view class="overlay">
                <AutoHeightImage
                        :source="require('../assets/images/side-bar.jpg')"
                        :width="screen.width"
                        :style="{flex: 1, resizeMode: 'stretch'}"
                ></AutoHeightImage>
            </view>
            <view class="row">
                <view class="col-4 text-center">
                    <touchable-opacity>
                        <view class="avatar"
                              :style="{
    width: viewScreen(14, 'vh'),
    height: viewScreen(14, 'vh'),

    }"
                        >
                            <AutoHeightImage
                                    :source="require('../assets/images/avatar1.png')"
                                    :width="'100%'"
                                    :style="{
    flex: 1,
    resizeMode: 'contain',
    borderRadius: screen.width+screen.height/2,
    borderWidth: 1
    }"
                            ></AutoHeightImage>
                        </view>
                    </touchable-opacity>
                </view>
                <view class="col-8" :style="{justifyContent: 'center', height: viewScreen(20, 'vh')}">
                    <nb-text class="text-bold text-light" :style="{fontSize: scaleFontSize(16)}">
                        {{getUserDefault.ten_khang}}
                    </nb-text>
                    <nb-text class="text-light" :style="{fontSize: scaleFontSize(12)}">
                        Số lượng căn hộ : {{getAmount}}
                    </nb-text>
                </view>
            </view>
        </view>
        <ListInforUserDetail :dataUser="getInforUser"></ListInforUserDetail>
    </view>

</template>
<script>
    import {mapGetters, mapActions} from 'vuex';
    import LibCustom from '../library/custom';
    import AutoHeightImage from 'react-native-auto-height-image';
    import ListInforUserDetail from './ListInforUserDetail.vue';
    export default {
        props: {},
        data: function () {
            return {
                screen: {
                    width: 0,
                    height: 0,
                },
                isShowModalConvertAccount: false,

                dataModel: [
                    {
                        "ten_khang": "Nguyễn Quang Chính",
                        "ma_canho": "11.07",
                        "diachi_duan": "607 Xô Viết Nghệ Tĩnh, P.26, quận Bình Thạnh.",
                    }
                ]
            };
        },
        components: {
            AutoHeightImage,
            ListInforUserDetail
        },
        computed: {
            getInforUser: function () {
//                return this.dataModel;
                return this.getUser().data;
            },
            getAmount: function () {
//                return this.dataModel.length;
                return this.getUser().data.length;
            },
            getUserDefault: function () {
//                return this.dataModel;
                return this.getIndexSelected();
            },
            getType: function () {
                return this.getTypeListInforUser();
            }
        },
        mounted: function () {
            this.screen = LibCustom.getSizeScreen();
        },
        methods: {
            ...mapGetters("login", ['getUser', 'getIndexSelected']),
            ...mapActions("login", ["setIndex"]),
            ...mapActions("screenBaseOnFooter", ["setScrollContainer"]),
            ...mapGetters("StoreScreenTemplateIconFooter", ["getTypeListInforUser"]),
            scaleFontSize: function (size) {
                return LibCustom.scaleFontSize(size);
            },
            viewScreen: function (percent, type, minus = 0) {
                return LibCustom.viewScreen(percent, type, minus);
            },

            handleConvertAccount: function () {
                this.isShowModalConvertAccount = true;
                this.setScrollContainer(false);
            },
            checkOdd: function (number) {
                if (number % 2 !== 0) {
                    return true;
                }
                return false;
            },
            handleChooseAccount: function (index) {
                this.isShowModalConvertAccount = false;
                this.setScrollContainer(true);
                this.setIndex(index);
            },
        },

    }
</script>
<style>
    .header {
        position: relative;
    }

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

    }

    .row {
        flex: 1;
        flex-direction: row;
    }

    .col-4 {
        width: 33.33%;
    }

    .text-center {
        justify-content: center;
        align-items: center;
    }

    .col-8 {
        width: 66.67%;
    }

    .text-bold {
        font-weight: bold;
    }

    .text-id {
        color: orange;
    }

    .modal {
        background-color: rgba(0, 0, 0, 0.5);
    }

    .modal-container {
        width: 90%;
        background-color: white;
        border-radius: 20;
        padding-top: 20;
        padding-bottom: 20;
    }

    .modal-header {
        padding-bottom: 20;
        padding-left: 20;
    }

    .p-20 {
        padding-top: 20;
        padding-bottom: 20;
        padding-left: 20;
        padding-right: 20;
    }

    .text-success {
        color: #303F9F;
    }

    .text-light {
        color: white;
    }

</style>