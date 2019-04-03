<template>
    <view class="content">
        <view v-for="todo in todoContents" :key="todo.id" class="row"
              :style="styleGeneralListItem">
            <view class="col-4 container" :style="{height: viewScreen(20, 'vh')}">
                <image
                        :source="todo.image.src"
                        :style="{resizeMode: 'stretch', width: todo.image.width, height: todo.image.height}"
                >
                </image>
            </view>
            <view class="col-8 pt-8percent" :style="{height: viewScreen(20, 'vh')}">
                <view class="container-truncate">
                    <nb-text :numberOfLines="1" class="title truncate-text" :style="{fontSize: scaleFontSize(16)}">
                        {{todo.data.title}}
                    </nb-text>
                </view>
                <view class="container-truncate">
                    <nb-text :numberOfLines="1" class="description truncate-text"
                             :style="{fontSize: scaleFontSize(14)}">{{todo.data.description}}
                    </nb-text>
                </view>
                <view class="container-truncate">
                    <nb-text class="time">{{todo.data.time}}</nb-text>
                </view>

            </view>
        </view>

    </view>
</template>
<script>
    import LibCustom from '../library/custom';
    import {Image} from 'react-native';
    export default {

        data: function () {
            return {
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
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.18,
                    shadowRadius: 1,
                    elevation: 1,
                    height: LibCustom.viewScreen(20, 'vh'),
                },
                todoContents: [
                    {
                        id: 0,
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
                    }
                ]
            };
        },
        created: function () {
            this.screen = LibCustom.getSizeScreen();
            let image;
            for (let i = 0, size = this.todoContents.length; i < size; i++) {
                image = LibCustom.getSizeImage(this.todoContents[i].image.src);
                if (image) {
                    let temp = image.width / image.height;
                    this.todoContents[i].image.width = LibCustom.viewScreen(30, 'vw');
                    this.todoContents[i].image.height = this.todoContents[i].image.width / temp;
                }
            }
        },
        componenets: {
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
        },


    };
</script>
<style>
    .content {
        flex: 1;
    }

    .row {
        flex: 1;
        flex-direction: row;
    }

    .col-4 {
        width: 33.33%;
    }

    .col-8 {
        width: 66.67%;
    }

    .pt-8percent {
        padding-top: 8%;
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
        align-items: center;
    }

    .container-truncate {
        flex-direction: row;
        padding-left: 2%;
        padding-right: 10%;
    }

    .truncate-text {
        flex: 1
    }
</style>