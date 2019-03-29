import {Dimensions, Animated, Easing, Platform} from 'react-native'
export default{

    getSizeScreen: function(){
        let obj = {
            width: 0,
            height: 0,
        }
        obj.width = Dimensions.get('window').width;
        obj.height = Dimensions.get('window').height;
        return obj;
    },
    scaleFontSize: function(size) {
        let obj = this.getSizeScreen();
        return size * obj.width / 380;
    },
    viewScreen: function (percent, type, minus = 0) {
        let obj = this.getSizeScreen();
        if (type === "vw") {
            return (obj.width * percent) / 100 + minus;
        } else if (type === "vh") {
            return (obj.height * percent) / 100 + minus;
        }
    },
}