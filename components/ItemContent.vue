<template>
    <GestureRecognizer
            :onSwipeLeft="() => onSwipeLeft(todo)"
            :onSwipeRight="() => onSwipeRight(todo)"
            :config="config"
    >
        <touchable-without-feedback :on-long-press="() => handleClick(todo)">
            <view class="row" :style="styleGeneralListItem">
                <view v-if="todo.allowEditable && todo.editable" class="col-2 text-center">
                    <nb-button danger
                               :style="{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: viewScreen(12.5, 'vw'),
                                    height: viewScreen(12.5, 'vw'),
                                    borderRadius: viewScreen(6.25, 'vw'),
                                    fontSize: scaleFontSize(16),

                                }">
                        <nb-icon type="FontAwesome" name="trash-o" class="mx-0"></nb-icon>
                    </nb-button>
                </view>
                <view class="col-4 container" :style="{height: viewScreen(20, 'vh')}">
                    <image
                            :source="todo.image.src"
                            :style="{resizeMode: 'cover', width: todo.image.width, height: todo.image.height}"
                    >
                    </image>
                </view>
                <view class="text-center"
                      :style="{height: viewScreen(21, 'vh')}"
                      :class="{
                                'col-6': todo.editable,
                                'col-8': !todo.editable,
                      }"
                >
                    <view :style="{height: todo.image.height+20}">
                        <view class="container-truncate">
                            <nb-text :numberOfLines="1" class="title truncate-text"
                                     :style="{fontSize: scaleFontSize(16)}">
                                {{todo.data.title}}
                            </nb-text>
                        </view>
                        <view class="container-truncate">
                            <nb-text :numberOfLines="1" class="description truncate-text"
                                     :style="{fontSize: scaleFontSize(12)}">{{todo.data.description}}
                            </nb-text>
                        </view>
                        <view class="container-truncate">
                            <nb-text class="time" :style="{fontSize: scaleFontSize(10)}">{{todo.data.time}}</nb-text>
                        </view>
                    </view>
                </view>
            </view>
        </touchable-without-feedback>
    </GestureRecognizer>

</template>
<script>
    import LibCustom from '../library/custom';
    import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
    export default {
        props: {
            todo: {
                type: Object,
            }
        },
        data: function () {
            return {
                config: {
                    velocityThreshold: 0.3,
                    directionalOffsetThreshold: 300
                },
                screen: {
                    width: 0,
                    height: 0,
                },
                styleGeneralListItem: {
                    borderBottomWidth: 0.5,
                    borderTopWidth: 0,
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    borderColor: 'rgba(0,0,0,0.5)',
                    paddingLeft: '5%',
                    height: LibCustom.viewScreen(20, 'vh'),
                },
            };
        },
        created: function () {
            this.screen = LibCustom.getSizeScreen();
            let image;
            image = LibCustom.getSizeImage(this.todo.image.src);
            if (image) {
                let temp = image.width / image.height;
                this.todo.image.width = LibCustom.viewScreen(30, 'vw');
                this.todo.image.height = this.todo.image.width / temp;
            }
        },
        components: {
            GestureRecognizer,
        },
        computed: {},
        mounted: function () {

        },
        methods: {
            scaleFontSize: function (size) {
                return LibCustom.scaleFontSize(size);
            },
            viewScreen: function (percent, type, minus = 0) {
                return LibCustom.viewScreen(percent, type, minus);
            },
            handleClick: function (todo) {
                if (todo.allowEditable) {
                    todo.editable = true;
                }
            },
            onSwipeLeft: function (todo) {
                if (todo.allowEditable) {
                    todo.editable = false;
                }

            },
            onSwipeRight: function (todo) {
                if (todo.allowEditable) {
                    todo.editable = true;
                }
            }
        },


    };
</script>
<style>


    .row {
        flex: 1;
        flex-direction: row;
    }

    .col-2 {
        width: 16.665%;
    }

    .col-4 {
        width: 33.33%;
    }

    .col-6 {
        width: 50%;
    }

    .col-8 {
        width: 66.67%;
    }

    .mx-0 {
        margin-left: 0;
        margin-right: 0;
    }

    .title {
        font-weight: bold;
    }

    .time {
        color: #303f9f;
        padding-top: 2%;
    }

    .container {
        flex: 1;
        justify-content: center;
        /*align-items: center;*/
    }

    .container-truncate {
        flex-direction: row;
        padding-left: 2%;
        padding-right: 10%;
    }

    .truncate-text {
        flex: 1
    }

    .text-center {
        justify-content: center;
    }
</style>