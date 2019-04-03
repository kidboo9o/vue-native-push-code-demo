import {Dimensions, Animated, Easing, Platform, Image} from 'react-native';
import md5 from "md5";
const serect_key="2b7867ba7d4c05c20569705d5538fb5b";
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
    getSizeImage: function(src){
        let image = Image.resolveAssetSource(src);
        return image;
    },
    scaleImage: function(originalWidth, originalHeight, expectSize, type='max'){
        let temp;
        if(type==='min'){
            temp = (originalWidth < originalHeight) ? originalWidth : originalHeight;
        }else if(type==='max'){
            temp = (originalWidth > originalHeight) ? originalWidth : originalHeight;
        }
        return (expectSize*100/temp)/100;
    },
    ma_hoa: function(str){
        return md5(str+"|"+serect_key);
    }
}