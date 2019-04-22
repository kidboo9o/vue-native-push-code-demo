<template>
    <view class="overlay"
          :style="{
                width: screen.width,
                height: screen.height,
                backgroundColor: todo.bgColor ? todo.bgColor : 'transparent',
          }"
    >
       <view class="container" :style="todo.styleContainer">
           <LottieView class="lottie"
                       :ref="spinnerSelected.name"
                       :source="spinnerSelected.src"
                       :loop="typeof todo.loop ? todo.loop : true"
                       :speed="typeof todo.speed ? todo.speed : 1"
                       :style="todo.style"
           />
       </view>
    </view>
</template>
<script>
    import React from 'react';
    import LottieView from 'lottie-react-native';
    import LibCustom from '../library/custom';
    import spinner1 from '../assets/lottie/spinner1.json';
    import spinner2 from '../assets/lottie/spinner2.json';
    import spinner3 from '../assets/lottie/spinner3.json';
    import spinner4 from '../assets/lottie/spinner4.json';
    import spinner5 from '../assets/lottie/spinner5.json';
    import success1 from '../assets/lottie/success1.json'; // frame 400 ms
    import success2 from '../assets/lottie/success2.json'; // frame 8410 ms
    import failed1 from '../assets/lottie/failed1.json'; // frame 890ms
    import fingerGuide1 from "../assets/lottie/finger-guide1.json" // frame 510ms
    import fingerGuide2 from "../assets/lottie/finger-guide2.json"
    import maintaince1 from "../assets/lottie/maintaince1.json"; // frame 210ms
    export default {
        props: {
            todo: {
                type: Object,
            }
            /* todoSpinner {
            *       type: 'spinner1'
            *       loop: 'true',
            *       speed: 1,
            *       toado: {
            *           x:
            *           y:
            *       }
            *       bgColor: color,
            *       start:
            *       end:
            *       style: {
            *           width
            *           height
            *       }
            *       styleContainer{
            *       }
            *
            * }*/
        },
        components: {LottieView},
        data: function () {
            return {
                screen: {
                    width: 0,
                    height: 0,
                },
                animation: null,
                list: [
                    {
                        id: 0,
                        name: 'spinner1',
                        src: require('../assets/lottie/spinner1.json'),
                    },
                    {
                        id: 1,
                        name: 'spinner2',
                        src: require('../assets/lottie/spinner2.json'),
                    },
                    {
                        id: 2,
                        name: 'spinner3',
                        src: require('../assets/lottie/spinner3.json'),
                    },
                    {
                        id: 3,
                        name: 'spinner4',
                        src: require('../assets/lottie/spinner4.json'),
                    },
                    {
                        id: 4,
                        name: 'spinner5',
                        src: require('../assets/lottie/spinner5.json'),
                    },
                    {
                        id: 5,
                        name: 'success1',
                        src: require('../assets/lottie/success1.json'),
                    },
                    {
                        id: 6,
                        name: 'success2',
                        src: require('../assets/lottie/success2.json'),
                    },
                    {
                        id: 7,
                        name: 'failed1',
                        src: require('../assets/lottie/failed1.json'),
                    },
                    {
                        id: 8,
                        name: 'fingerGuide1',
                        src: require('../assets/lottie/finger-guide1.json'),
                    },
                    {
                        id: 9,
                        name: 'fingerGuide2',
                        src: require('../assets/lottie/finger-guide2.json'),
                    },
                    {
                        id: 10,
                        name: 'maintaince1',
                        src: require('../assets/lottie/maintaince1.json'),
                    },
                ],
                spinnerSelected: {},
            };
        },
        created: function () {
            console.log(this.todo);
            let arrKeys = Object.keys(this.todo);
            if (arrKeys.includes("type") === false) {
                this.spinnerSelected = this.list[0];
            } else {
                let index = this.checkTypeExists(this.todo.type);
                if(index === -1){
                    this.spinnerSelected = this.list[0];
                }else{
                    this.spinnerSelected = this.list[index];
                }
            }
        },
        methods: {
            playAnimation() {
                if (!this.animation) {
                    this.animation = this.spinnerSelected.name;
                    this.playAnimation();
                } else if (this.$refs[this.spinnerSelected.name]) {
                    this.$refs[this.spinnerSelected.name].reset();
                    if(typeof this.todo.start !== undefined && typeof this.todo.end !== undefined){
                        this.$refs[this.spinnerSelected.name].play(this.todo.start,this.todo.end);
                    }else{
                        this.$refs[this.spinnerSelected.name].play();
                    }

                }
            },
            checkTypeExists: function (type) {
                for (let i = 0, size = this.list.length; i < size; i++) {
                    if(this.list[i].name === type){
                        return i; //success
                    }
                }
                return -1; //not found
            },
            scaleFontSize: function (size) {
                return LibCustom.scaleFontSize(size);
            },
            viewScreen: function (percent, type, minus = 0) {
                return LibCustom.viewScreen(percent, type, minus);
            },
        },
        mounted() {
            this.playAnimation();
            this.screen = LibCustom.getSizeScreen();
        },
        beforeUpdate() {
            this.playAnimation();
        }
    };
</script>
<style>
    .overlay {
        position: absolute;
        z-index: 88888;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .container{
        flex: 1;
        justify-content: center;
        align-items: center;
    }
</style>