<template>
    <view class="content">
        <view v-if="getShowModal">
            <modal :transparent="true" :animationType="'slide'">
                <view class="modal">
                    <nb-text class="text-bold text-light px-15" :style="{fontSize: scaleFontSize(20)}">Vui lòng trượt qua bên phải nếu bạn muốn xóa thông báo</nb-text>
                </view>
                <SpinnerEffectLottie :todo="loadGuide"></SpinnerEffectLottie>
            </modal>
        </view>
        <view v-if="todoContents.data.length > 0">
            <ItemContent v-for="todo in todoContents.data" :key="todo.id" :todo="todo"></ItemContent>
        </view>
        <view v-else>
           <nb-content padder>
               <nb-text>Không có thông báo</nb-text>
           </nb-content>
        </view>
    </view>
</template>
<script>
    import LibCustom from '../library/custom';
    import ItemContent from './ItemContent.vue';
    import {mapGetters, mapActions} from 'vuex';
    import SpinnerEffectLottie from "../components/SpinnerEffectLottie.vue";
    export default {
        props: {},
        data: function () {
            return {
                screen: {
                    width: 0,
                    height: 0,
                },
                loadGuide: {
                    type: 'fingerGuide2',
                    bgColor: 'rgba(0,0,0,0.8)',
                    loop: true,
                    style: {
                        width: 100,
                        height: 100,
                    },

                },
                showModal: false,
            };
        },
        created: function () {
            let arr = this.getListStep();
            let size = arr.length;
            if(arr[size-1] && arr[size-1] === "ThongBaoChung"){
                this.showModal = true;
                setTimeout(() => {
                    this.showModal = false;
                }, 4000);

            }
        },
        components: {
            ItemContent,
            SpinnerEffectLottie
        },
        computed: {
            todoContents: function(){
                return this.getContent();
            },
            getShowModal: function(){
                return this.showModal;
            }
        },
        mounted: function () {
            this.screen = LibCustom.getSizeScreen();
        },
        methods: {
            ...mapGetters("screenBaseOnFooter", ["getContent", "getListStep"]),
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
    .modal{
        flex: 0.7;
        align-items: center;
        justify-content: center;
        z-index: 99999;
    }
    .text-bold{
        font-weight: bold;
    }
    .text-light{
        color: white;
    }
    .px-15{
        padding-left: 15%;
        padding-right: 15%;
    }
</style>