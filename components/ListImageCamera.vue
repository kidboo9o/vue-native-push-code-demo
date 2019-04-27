<template>
    <view class="container">
        <view class="row">
            <view class="col-3" v-for="todo in todos" :key="todo.id">
                <view v-if="indexRemove !== todo.id"
                      :style="{width: '80%'}" class="text-center"
                >
                    <touchable-opacity :on-long-press="() => handleShowRemove(todo.id)" :on-press="() => handleShow(todo.id)">
                        <AutoHeightImage
                                :source="todo.src"
                                :width="viewScreen(15, 'vw')"
                        ></AutoHeightImage>
                    </touchable-opacity>
                </view>
                <view v-else>
                    <BoxItem
                            :style="{position: 'relative', paddingTop: 10, paddingLeft: 10}"
                            :pose="isAnimation === true ? 'LEFT' : 'RIGHT'"
                    >
                        <view :style="{width: '80%'}" class="text-center">
                            <touchable-without-feedback>
                                <AutoHeightImage
                                        :source="todo.src"
                                        :width="viewScreen(15, 'vw')"
                                ></AutoHeightImage>
                            </touchable-without-feedback>
                        </view>
                        <view :style="{position: 'absolute', top: 0, left: -3, zIndex: 99999}">
                            <touchable-opacity :on-press="() => handleRemove(todo.id)">
                                <nb-icon class="text-danger" name="ios-close-circle" type="ios-close-circle"></nb-icon>
                            </touchable-opacity>
                        </view>
                    </BoxItem>
                </view>
            </view>

        </view>
    </view>
</template>
<script>
    import AutoHeightImage from 'react-native-auto-height-image';
    import LibCustom from '../library/custom';
    import posed from 'react-native-pose';
    import {mapGetters, mapActions} from 'vuex';
    import { Alert, Platform, AlertIOS } from 'react-native';
    const BoxItem = posed.View({
        DEFAULT: {},
        LEFT: {
            rotate: "5deg",
            transition: {duration: 300},
        },
        RIGHT: {
            rotate: "-5deg",
            transition: {duration: 300}
        }
    })
    export default {
        props: {
            todos: {
                type: Array,
            },
            navigation: {
                type: Object
            }
        },
        data: function () {
            return {
                screen: {
                    width: 0,
                    height: 0,
                },
                isAnimation: true,
                indexRemove: -1,
                runAnimation: null,
            };
        },
        mounted: function () {
            this.screen = LibCustom.getSizeScreen();
        },
        computed: {},
        methods: {
            ...mapActions("storeCamera", ["setShowListImageStartByIndexSelected", "setRemoveImage"]),
            scaleFontSize: function (size) {
                return LibCustom.scaleFontSize(size);
            },
            viewScreen: function (percent, type, minus = 0) {
                return LibCustom.viewScreen(percent, type, minus);
            },
            handleShowRemove: function (id) {
                this.indexRemove = id;
                if(this.runAnimation !== null){
                    clearInterval(this.runAnimation);
                }
                this.runAnimation = setInterval(() => {
                    this.isAnimation = !this.isAnimation;
                },200);
            },
            handleShow: function(id){
                this.setShowListImageStartByIndexSelected(id);
                this.navigation.navigate("DeckSwipeImageCamera");
            },
            handleRemove: function(id){
                if (Platform.OS === "ios") {
                    AlertIOS.alert(
                        'Bạn có chắc muốn xóa hình ảnh này không ?',
                        '',
                        [
                            {
                                text: 'Có',
                                onPress: () => this.handleClickYes(id),
                            },
                            {
                                text: 'Không',
                                onPress: () => this.handleClickNo(id),
                            },
                        ],
                    );

                } else {
                    Alert.alert(
                        'Bạn có chắc muốn xóa hình ảnh này không ?',
                        '',
                        [
                            {text: 'Có', onPress: () => this.handleClickYes(id)},
                            {text: 'Không', onPress: () => this.handleClickNo(id)},
                        ],
                        {cancelable: false}
                    )
                }
            },
            handleClickYes: function (id) {
                this.setRemoveImage(id);
            },
            handleClickNo: function (id) {
            }


        },
        components: {AutoHeightImage, BoxItem},
    };
</script>
<style>
    .container {
        flex: 1;
    }

    .row {
        flex: 1;
        flex-direction: row;
    }

    .col-3 {
        width: 25%;
    }

    .text-center {
        justify-content: center;
        align-items: center;
    }
    .text-danger{
        color: red;
    }
</style>