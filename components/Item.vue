<template>
    <nb-list-item icon :style="todo.style" :on-press="handleClick">
        <nb-left>
            <nb-icon :type="todo.left.data[0].icon.type" :name="todo.left.data[0].icon.name"
                     :style="todo.left.data[0].icon.style"/>
        </nb-left>
        <nb-body :style="todo.body.style">
            <nb-text :style="todo.body.data[0].text.style">{{todo.body.data[0].text.title}}</nb-text>
        </nb-body>
    </nb-list-item>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex';
    export default {
        props: {
            todo: Object,
            navigation: {
                type: Object
            }
        },

        computed: {
            isLogin: function () {
                return this.checkLogin;
            },
        },
        data: function () {
            return {};
        },
        mounted: function () {

        },
        methods: {
            ...mapActions("login", ['removeUser',]),
            ...mapGetters("login", ['checkLogin']),
            ...mapActions("screenBaseOnFooter",
                [
                    'setTitleHeader',
                    'setIconHeader',
                    'setScreen',
                    'onlyEnableComponent',
                    'setStyleContainer',
                    'setRouteHeader'
                ]),
            ...mapActions("StoreScreenTemplateIconFooter", ["onlyEnableComponent_TemplateIconFooter", "setTypeShowListInforUser"]),

            handleClick: function () {
                if(this.todo.route){
                    this.navigation.navigate(this.todo.route);
                }else{
                    switch(this.todo.name){
                        case "logout":
                            this.removeUser();
                            this.setScreen("Home");
                            this.navigation.navigate("DrawerClose");
                            break;
                        case "thong-tin-ung-dung":
                            this.setStyleContainer({backgroundColor: 'rgba(0,0,0,0.05)'});
                            this.onlyEnableComponent_TemplateIconFooter("applicationinformation");
                            this.onlyEnableComponent('templatehandleiconfooter');
                            this.setTitleHeader("Thông tin ứng dụng");
                            this.setIconHeader({name: 'ios-arrow-back', type: 'Ionicons'});
                            this.setRouteHeader("back");
                            this.navigation.navigate("DrawerClose");
                            break;
                        case "change-password":
                            if (this.isLogin()) {
                                this.setStyleContainer({backgroundColor: 'rgba(0,0,0,0.05)'});
                                this.onlyEnableComponent_TemplateIconFooter("changepassword");
                                this.onlyEnableComponent('templatehandleiconfooter');
                                this.setTitleHeader("Thay đỗi mật khẩu");
                                this.setIconHeader({name: 'ios-arrow-back', type: 'Ionicons'});
                                this.setRouteHeader("back");
                                this.navigation.navigate("DrawerClose");
                            } else {
                                this.navigation.navigate("Login");
                            }
                            break;
                    }
                }
            },

        },


    };
</script>
<style>

</style>