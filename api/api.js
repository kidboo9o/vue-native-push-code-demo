import LibCustom from '../library/custom';
import axios from "axios";
import qs from "qs";

const host_ws = "http://ws.venuscorp.vn/WS_VENUSAPP/VenusCSKH";
const ws_check_login = host_ws+"/check_login";
const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
};

export default {
    check_login: function(username, password){
        let data = {
            username: username,
            password: password,
            maChungThuc: LibCustom.ma_hoa(username + password),
        };
        return axios.post(ws_check_login, qs.stringify(data) , config);
    }
}