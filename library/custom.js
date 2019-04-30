import {Dimensions, Animated, Easing, Platform, Image} from 'react-native';
import md5 from "md5";
const serect_key = "2b7867ba7d4c05c20569705d5538fb5b";
export default{
    getSizeScreen: function () {
        let obj = {
            width: 0,
            height: 0,
        }
        obj.width = Dimensions.get('window').width;
        obj.height = Dimensions.get('window').height;
        return obj;
    },
    scaleFontSize: function (size) {
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
    getSizeImage: function (src) {
        let image = Image.resolveAssetSource(src);
        return image;
    },
    scaleImage: function (originalWidth, originalHeight, expectSize, type = 'max') {
        let temp;
        if (type === 'min') {
            temp = (originalWidth < originalHeight) ? originalWidth : originalHeight;
        } else if (type === 'max') {
            temp = (originalWidth > originalHeight) ? originalWidth : originalHeight;
        }
        return (expectSize * 100 / temp) / 100;
    },
    ma_hoa: function (str) {
        return md5(str + "|" + serect_key);
    },

    convertUTF8: function (alias) {
        var str = alias;
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
        str = str.replace(/ + /g, " ");
        str = str.replace(/ /g,"-");
        str = str.trim();
        return str;
    },
    arr_diff: function (a1, a2) {
        var a = [], diff = [];
        for (var i = 0; i < a1.length; i++) {
            a[a1[i]] = true;
        }
        for (var i = 0; i < a2.length; i++) {
            if (a[a2[i]]) {
                delete a[a2[i]];
            } else {
                a[a2[i]] = true;
            }
        }
        for (var k in a) {
            diff.push(k);
        }
        return diff;
    },
    searchWebsiteToString: function(str){
        let regexTemplate = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g;
        let result = str.match(regexTemplate);
        return result;
    },
    isEmpty: function(obj){
        for(var key in obj){
            if(obj.hasOwnProperty(key)){
                return false;
            }
        }
        return true;
    }
}