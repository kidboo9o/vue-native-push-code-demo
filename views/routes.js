import {
    StackNavigator,
    SwitchNavigator,
    DrawerNavigator,
} from "vue-native-router";
import React from "react";
import HomeVue from "./Home.vue";
import LoginVue from "./Login.vue";
import SideBar from '../components/SideBar.vue';
import RegisterVue from './Register.vue';
import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('screen');



import AnimationDemo from "./AnimationDemo.vue";
import ModalRegister from "./ModalRegister.vue";
// ----------------------------------------------------------------------------
// THIS IS THE REACT NAVIGATION STUFF THAT IS WAY DIFFERENT FROM THE
// VUE-ROUTER WE ALL KNOW AND LOVE

// the is the navigation stack for the main application after authentication
// or account creation is completed. The stackNavigator is the basic master=detail UX
// that is seen in most mobile applications
import DeckSwipeImageCamera from "../components/DeckSwipeImageCamera.vue";
const Drawer = DrawerNavigator(
    {
        Home: {
            screen: HomeVue
        },
        Login: {
            screen: LoginVue
        },
        Register: {
          screen: RegisterVue
        },
        AnimationDemo: {
            screen: AnimationDemo
        },
        ModalRegister: {
            screen: ModalRegister
        },
        DeckSwipeImageCamera: {
            screen: DeckSwipeImageCamera
        }
    },
    {
        initialRouteName: "Home",
        contentOptions: {
            activeTintColor: "#e91e63"
        },
        contentComponent: props => {
         //   console.log("props inside contentComponent", props);
            return <SideBar {...props} />;
        },
        drawerWidth: width * 0.8,

    }
);
export const AppNavigation = StackNavigator({
        // Home route will render the component HomeVue
        Drawer: {
            screen: Drawer
        },

    },
    {
        initialRouteName: "Drawer",
        headerMode: "none"
    });
