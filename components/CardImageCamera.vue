<template>
    <nb-card :style="{ elevation: 3, width: viewScreen(90, 'vw') }">
        <nb-cardItem>
            <nb-left>
                <nb-thumbnail :source="item.src"/>
            </nb-left>
            <nb-body>
                <nb-text></nb-text>
                <nb-text note>Ảnh {{item.id}}</nb-text>
            </nb-body>
            <nb-right>
                <touchable-opacity :on-press="() => removeImage(item.id)">
                    <nb-icon type="FontAwesome" name="trash-o" class="text-danger"
                             :style="{fontSize: scaleFontSize(30)}"></nb-icon>
                </touchable-opacity>
            </nb-right>
        </nb-cardItem>
        <nb-cardItem cardBody>
            <image
                    :style="{resizeMode: 'cover', width: item.width, height: item.height}"
                    :source="item.src"
            />
        </nb-cardItem>
    </nb-card>
</template>
<script>
    import LibCustom from '../library/custom';
    import {Constants} from 'expo';
    import React, {Component} from 'react';
    import {Text, View, StyleSheet, TouchableOpacity, Alert, Platform, AlertIOS} from 'react-native';
    import {mapGetters, mapActions} from 'vuex';
    export default {
        props: {
            item: {
                type: Object
            }
        },
        data: function () {
            return {
                screen: {
                    width: 0,
                    height: 0,
                },
            };
        },
        mounted: function () {
            this.screen = LibCustom.getSizeScreen();
        },
        computed: {},
        methods: {
            ...mapActions("storeCamera", ["setRemoveImage"]),
            scaleFontSize: function (size) {
                return LibCustom.scaleFontSize(size);
            },
            viewScreen: function (percent, type, minus = 0) {
                return LibCustom.viewScreen(percent, type, minus);
            },
            removeImage: function (id) {
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
                alert("xoa ne : "+id);
                this.setRemoveImage(id);
            },
            handleClickNo: function (id) {
            }

        },
    };
</script>
<style>
    .text-danger {
        color: red;
    }
</style>
