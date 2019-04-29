window.appConfigs = {
    version: '1.2',
    ws_host : host_ws,
//    ws_getHost: this.ws_host+"/process/getHost",
    ws_checkVersion: host_ws+"/checkVersion",
    ws_check_login: host_ws+"/check_login",
    ws_check_register: host_ws+"/check_register",
    ws_register: host_ws+"/register",
    ws_add_taisan: host_ws+"/add_taisan",
    ws_lay_ds_taisan: host_ws+"/lay_ds_taisan",
    ws_xoaTaiSan: host_ws+"/xoaTaiSan",

    ws_lay_ds_tatca_thongbao: host_ws+"/lay_ds_tatca_thongbao",
    ws_lay_ds_thongbao_moi: host_ws+"/lay_ds_thongbao_moi",
    ws_capnhat_thongbao_daxem: host_ws+"/capnhat_thongbao_daxem",

    ws_lay_ds_loaidichvu: host_ws+"/lay_ds_loaidichvu",
    ws_gui_phanAnhGopY: host_ws+"/gui_phanAnhGopY",
    ws_gui_dangKyDichVu: host_ws+"/gui_dangKyDichVu",


    ws_lay_ds_phidichvu: host_ws+"/lay_ds_phidichvu",
    ws_lay_ds_thongTinDienNuoc: host_ws+"/lay_ds_phidiennuoc",
    ws_lay_ds_phikhac: host_ws+"/lay_ds_phikhac",
    ws_doimatkhau: host_ws+"/doimatkhau",
    ws_capNhatToken: host_ws+"/capNhatToken",

    serect_key : "2b7867ba7d4c05c20569705d5538fb5b",
    OS: '',
    LOAITB: '',
    IMEI: '',
    senderID : "70116935084", // VENUS_CSKH

    // thong bao
    thongBaoDangKyThanhCong_tieuDe: "Th?ng b?o !",
    thongBaoDangKyThanhCong_noiDung: "?? dang k? th?nh c?ng !",
    thongBaoDangKyThanhCong_button: "??ng ?",

    thongBaoLoiKetNoi_tieuDe: "L?i d? li?u !",
    thongBaoLoiKetNoi_noiDung: "Kh?ng c? m?ng ho?c k?t n?i d? li?u b? l?i !",
    thongBaoLoiKetNoi_button: "Th? l?i",

    updateConfigs : function(callback){
        console.log('start update config');
        try{
            window.appConfigs.OS = window.device.platform;
            window.appConfigs.LOAITB = window.device.model;
            window.appConfigs.IMEI = window.device.uuid;

            if(window.appConfigs.OS.toUpperCase() == 'IOS'){
                window.appConfigs.OS = 'iOS';
            }

            if(window.appConfigs.OS.toUpperCase() == 'ANDROID' || window.appConfigs.OS == 'android'){
                window.appConfigs.OS = 'android';
                if( typeof (window.device.IMEI) != 'undefined'){
                    window.appConfigs.IMEI = window.device.IMEI;
                }
            }

        }catch(e){
            window.appConfigs.OS = 'iOS';
            window.appConfigs.LOAITB = 'iphone';
            window.appConfigs.IMEI = '123456789';
        }

    },
    push : null,
    token : "",
    dienthoai_tongdai: "02862889955",
}

var host_ws = "http://ws.venuscorp.vn/WS_VENUSAPP/VenusCSKH";

function thongbaoLoiKetNoi(callback){
    console.log('thong bao loi ket noi');
    var myApp = new Framework7();
    myApp.modal({
        title:  appConfigs.thongBaoLoiKetNoi_tieuDe,
        text: appConfigs.thongBaoLoiKetNoi_noiDung,
        buttons: [
            {
                text: appConfigs.thongBaoLoiKetNoi_button,
                onClick: function() {
                    callback();
                }
            }
        ]
    });
}

function ws_get_kiemTraVersion(callback){
    var $$ = Dom7;
    $$('#loading').css('display','inherit');
    $$.ajax({
        url: window.appConfigs.ws_checkVersion,
        method: 'POST',
        dataType: 'json',
        data: {
            'os' : window.appConfigs.OS,
            'version' : window.appConfigs.version,
            maChungThuc: ma_hoa(window.appConfigs.OS+window.appConfigs.version),
        },
        success: function(data){
            $$('#loading').css('display','none');
            callback(data);
        },
        error: function(){
            $$('#loading').css('display','none');
            thongbaoLoiKetNoi(function(){
                ws_get_kiemTraVersion(callback);
            });
        }
    });
}

function ma_hoa(str){
    return md5(str+"|"+appConfigs.serect_key);
}

function check_login(username,password,callback){

    var $$ = Dom7;
    $$('#loading').css('display','inherit');
    $$.ajax({
        url: window.appConfigs.ws_check_login,
        method: 'POST',
        dataType: 'json',
        data: {
            username: username,
            password: password,
            maChungThuc: ma_hoa(username+password),
        },
        success: function(data){
            $$('#loading').css('display','none');
            callback(data);
        },
        error: function(){

            $$('#loading').css('display','none');
            thongbaoLoiKetNoi(function(){
                check_login(username,password,callback);
            });
        }
    });
}

function register(username,password,callback){

    var $$ = Dom7;
    $$('#loading').css('display','inherit');
    $$.ajax({
        url: window.appConfigs.ws_register,
        method: 'POST',
        dataType: 'json',
        data: {
            username: username,
            password: password,
            maChungThuc: ma_hoa(username+password),
        },
        success: function(data){
            $$('#loading').css('display','none');
            callback(data);
        },
        error: function(){
            $$('#loading').css('display','none');
            thongbaoLoiKetNoi(function(){});
        }
    });
}

function ws_lay_ds_taisan(username,callback){
    var $$ = Dom7;
    $$('#loading').css('display','inherit');
    $$.ajax({
        url: window.appConfigs.ws_lay_ds_taisan,
        method: 'POST',
        dataType: 'json',
        data: {
            username: username,
            maChungThuc: ma_hoa(username),
        },
        success: function(data){
            $$('#loading').css('display','none');
            callback(data);
        },
        error: function(){
            $$('#loading').css('display','none');
            thongbaoLoiKetNoi(function(){});
        }
    });
};

function ws_add_taisan(username,ma_canho,callback){
    var $$ = Dom7;
    $$('#loading').css('display','inherit');
    $$.ajax({
        url: window.appConfigs.ws_add_taisan,
        method: 'POST',
        dataType: 'json',
        data: {
            username: username,
            ma_canho: ma_canho,
            maChungThuc: ma_hoa(username+ma_canho),
        },
        success: function(data){
            $$('#loading').css('display','none');
            callback(data);
        },
        error: function(){
            $$('#loading').css('display','none');
            thongbaoLoiKetNoi(function(){});
        }
    });
};

function ws_xoaTaiSan(id,callback) {
    var $$ = Dom7;
    $$('#loading').css('display','inherit');
    $$.ajax({
        url: window.appConfigs.ws_xoaTaiSan,
        method: 'POST',
        dataType: 'json',
        data: {
            id: id,
            maChungThuc: ma_hoa(id),
        },
        success: function(data){
            $$('#loading').css('display','none');
            callback(data);
        },
        error: function(){
            $$('#loading').css('display','none');
            thongbaoLoiKetNoi(function(){});
        }
    });
}

/* ---------------------- THONG BAO ------------------------------------- */
function ws_lay_ds_tatca_thongbao(username,callback){
    var $$ = Dom7;
    $$('#loading').css('display','inherit');
    $$.ajax({
        url: window.appConfigs.ws_lay_ds_tatca_thongbao,
        method: 'POST',
        dataType: 'json',
        data: {
            username: username,
            maChungThuc: ma_hoa(username),
        },
        success: function(data){
            $$('#loading').css('display','none');
            callback(data);
        },
        error: function(){
            $$('#loading').css('display','none');
            thongbaoLoiKetNoi(function(){});
        }
    });
};

function ws_lay_ds_thongbao_moi(username,max_ngay,callback){
    var $$ = Dom7;
    $$('#loading').css('display','inherit');
    $$.ajax({
        url: window.appConfigs.ws_lay_ds_thongbao_moi,
        method: 'POST',
        dataType: 'json',
        data: {
            username: username,
            max_ngay: max_ngay,
            maChungThuc: ma_hoa(username+max_ngay),
        },
        success: function(data){
            $$('#loading').css('display','none');
            callback(data);
        },
        error: function(){
            $$('#loading').css('display','none');
            thongbaoLoiKetNoi(function(){});
        }
    });
};

function ws_capnhat_thongbao_daxem(username,ds_thongbao,callback){

    var $$ = Dom7;
    // $$('#loading').css('display','inherit');
    var json_danhsach_thongbao = JSON.stringify(ds_thongbao);

    $$.ajax({
        url: window.appConfigs.ws_capnhat_thongbao_daxem,
        method: 'POST',
        dataType: 'json',
        data: {
            username: username,
            ds_thongbao: json_danhsach_thongbao,
            maChungThuc: ma_hoa(username+json_danhsach_thongbao),
        },
        success: function(data){
            // $$('#loading').css('display','none');
            callback(data);
        },
        error: function(){
            // $$('#loading').css('display','none');
            // thongbaoLoiKetNoi(function(){});
        }
    });
};
/* ---------------------- // THONG BAO ------------------------------------- */

/* -------------------------- DICH VU -------------------------------------- */
function ws_lay_ds_loaidichvu(callback){
    var $$ = Dom7;
    $$('#loading').css('display','inherit');
    $$.ajax({
        url: window.appConfigs.ws_lay_ds_loaidichvu,
        method: 'POST',
        dataType: 'json',
        data: {
        },
        success: function(data){
            $$('#loading').css('display','none');
            callback(data);
        },
        error: function(){
            $$('#loading').css('display','none');
            thongbaoLoiKetNoi(function(){});
        }
    });
}

function ws_gui_phanAnhGopY(data,callback){
    var $$ = Dom7;
    $$('#loading').css('display','inherit');
    $$.ajax({
        url: window.appConfigs.ws_gui_phanAnhGopY,
        method: 'POST',
        dataType: 'json',
        data: {
            'username' : data.username,
            'id_taikhoan_chitiet' : data.id_taikhoan_chitiet,
            'ten_nguoiyeucau' : data.ten_nguoiyeucau,
            'dienthoai_lienhe' : data.dienthoai_lienhe,
            'dichvu' : data.dichvu,
            'noidung' : data.noidung,
            maChungThuc: ma_hoa(data.username+data.id_taikhoan_chitiet+data.ten_nguoiyeucau+data.dienthoai_lienhe+data.dichvu+data.noidung),
        },
        success: function(data){
            $$('#loading').css('display','none');
            callback(data);
        },
        error: function(){
            $$('#loading').css('display','none');
            thongbaoLoiKetNoi(function(){});
        }
    });
}

function ws_gui_dangKyDichVu(data,callback){
    var $$ = Dom7;
    $$('#loading').css('display','inherit');
    $$.ajax({
        url: window.appConfigs.ws_gui_dangKyDichVu,
        method: 'POST',
        dataType: 'json',
        data: {
            'username' : data.username,
            'id_taikhoan_chitiet' : data.id_taikhoan_chitiet,
            'ten_nguoiyeucau' : data.ten_nguoiyeucau,
            'dienthoai_lienhe' : data.dienthoai_lienhe,
            'dichvu' : data.dichvu,
            'noidung' : data.noidung,
            maChungThuc: ma_hoa(data.username+data.id_taikhoan_chitiet+data.ten_nguoiyeucau+data.dienthoai_lienhe+data.dichvu+data.noidung),
        },
        success: function(data){
            $$('#loading').css('display','none');
            callback(data);
        },
        error: function(){
            $$('#loading').css('display','none');
            thongbaoLoiKetNoi(function(){});
        }
    });
}
/* -----------------------//  DICH VU -------------------------------------- */

/* -------------------------  TRA CUU -------------------------------------- */
function ws_lay_ds_phidichvu(ma_canho,thang,nam,callback){
    var $$ = Dom7;
    $$('#loading').css('display','inherit');
    $$.ajax({
        url: window.appConfigs.ws_lay_ds_phidichvu,
        method: 'POST',
        dataType: 'json',
        data: {
            'ma_canho' : ma_canho,
            'thang' : thang,
            'nam' : nam,
            maChungThuc: ma_hoa(ma_canho+thang+nam),
        },
        success: function(data){
            $$('#loading').css('display','none');
            callback(data);
        },
        error: function(){
            $$('#loading').css('display','none');
            thongbaoLoiKetNoi(function(){});
        }
    });
}

function ws_lay_ds_thongTinDienNuoc(ma_canho,thang,nam,callback){
    var $$ = Dom7;
    $$('#loading').css('display','inherit');
    $$.ajax({
        url: window.appConfigs.ws_lay_ds_thongTinDienNuoc,
        method: 'POST',
        dataType: 'json',
        data: {
            'ma_canho' : ma_canho,
            'thang' : thang,
            'nam' : nam,
            maChungThuc: ma_hoa(ma_canho+thang+nam),
        },
        success: function(data){
            $$('#loading').css('display','none');
            callback(data);
        },
        error: function(){
            $$('#loading').css('display','none');
            thongbaoLoiKetNoi(function(){});
        }
    });
}

function ws_lay_ds_phiKhac(ma_canho,thang,nam,callback){
    var $$ = Dom7;
    $$('#loading').css('display','inherit');
    $$.ajax({
        url: window.appConfigs.ws_lay_ds_phikhac,
        method: 'POST',
        dataType: 'json',
        data: {
            'ma_canho' : ma_canho,
            'thang' : thang,
            'nam' : nam,
            maChungThuc: ma_hoa(ma_canho+thang+nam),
        },
        success: function(data){
            $$('#loading').css('display','none');
            callback(data);
        },
        error: function(){
            $$('#loading').css('display','none');
            thongbaoLoiKetNoi(function(){});
        }
    });
}

/* -----------------------//  TRA CUU -------------------------------------- */

function ws_doimatkhau(taikhoan,matkhaucu,matkhaumoi,callback){
    var $$ = Dom7;
    $$.ajax({
        url: window.appConfigs.ws_doimatkhau,
        method: 'POST',
        dataType: 'json',
        data: {
            taiKhoan : taikhoan,
            matKhauCu : matkhaucu,
            matKhauMoi : matkhaumoi,
            maChungThuc: ma_hoa(taikhoan+matkhaucu+matkhaumoi),
        },
        success: function(data){
            callback(data);
        },
        error: function(){
            $$('#loading').css('display','none');
            thongbaoLoiKetNoi(function(){});
        }
    });
}


function ws_capNhatToken(username,tokenID,callback){
  //  showlog("call ws_capNhatToken");
    var $$ = Dom7;
    var os = window.appConfigs.OS;
    var version = window.appConfigs.version;
    $$.ajax({
        url: window.appConfigs.ws_capNhatToken,
        method: 'POST',
        dataType: 'json',
        data: {
            username : username,
            token : tokenID,
            os: os,
            version: version,
            maChungThuc: ma_hoa(username+tokenID+os+version),
        },
        success: function(data){
         //   showlog('Callback ws_capNhatToken');
            showlog(data);
            callback();
        },
        error: function(){
         //   showlog('Callback error');
            $$('#loading').css('display','none');
            thongbaoLoiKetNoi(function(){});
        }
    });
}
