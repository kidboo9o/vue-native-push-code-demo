import {
    StackNavigator,
    SwitchNavigator
} from "vue-native-router";

import HomeVue from "./Home.vue";
// ----------------------------------------------------------------------------
// THIS IS THE REACT NAVIGATION STUFF THAT IS WAY DIFFERENT FROM THE
// VUE-ROUTER WE ALL KNOW AND LOVE

// the is the navigation stack for the main application after authentication
// or account creation is completed. The stackNavigator is the basic master=detail UX
// that is seen in most mobile applications
export const AppNavigation = StackNavigator({
        // Home route will render the component HomeVue
        Home: {
            screen: HomeVue
        },
    },
    {
        initialRouteName: "Home",
        headerMode: "none"
    });
