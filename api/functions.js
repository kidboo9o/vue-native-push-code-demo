/**
 * Created by Ly Xuan Truong on 1/11/2017.
 */

function kiemtra_trangthai_dangnhap(callback){
    var myApp = new Framework7({
        pushState : true,
        swipeBackPage: false,
    });
    if(localStorage.getItem("login")!=null){
        callback();
    }else{
        open_modal_dangnhap();
    //  myApp.loginScreen('.login-screen',false);
    }
}

function open_modal_dangnhap(){
    var $$ = Dom7;
    var myApp = new Framework7({
        pushState : true,
        swipeBackPage: false,
    });
    var modal = myApp.modal({
        title: 'Đăng nhập',
        text: 'Vui lòng đăng nhập để sử dụng chương trình',
        afterText:  '<form class="form_dangnhap" autocomplete="off">'+
        '<div class="list-block">'+
        // '<label for="input_sodienthoai">Số điện thoại :</label>'+
        '<input class="input_username" type="text" name="input_username" value="" placeholder="Nhập số điện thoại" autocomplete="off">'+
        // '<label for="input_matkhau">Mật khẩu :</label>'+
        '<input class="input_matkhau" type="password" name="input_matkhau" value="" placeholder="Mật khẩu" autocomplete="off">'+
        '</div>'+
        '</form>',
        buttons: [
            {
                text: 'Đăng ký',
                close: true,
                onClick: function(){
                   open_modal_dangky();
                }
            },
            {
                text: 'Đăng nhập',
                bold: true,
                close: false,
                onClick: function () {
                    var username = $$('.form_dangnhap .input_username').val().trim();
                    var matkhau = $$('.form_dangnhap .input_matkhau').val().trim();

                    if(username==''){
                        $$('.form_dangnhap').parent().children('.modal-text').html('Số điện thoại không được để trống!');
                        $$('.form_dangnhap').parent().children('.modal-text').css('color','red');
                        return;
                    }
                    if(matkhau==''){
                        $$('.form_dangnhap').parent().children('.modal-text').html('Điền mật khẩu của bạn!');
                        $$('.form_dangnhap').parent().children('.modal-text').css('color','red');
                        return;
                    }

                    check_login(username,matkhau,function(data){
                        // showlog("callback check_login");
                        if(data.code == 1){
                            $$('.form_dangnhap').parent().children('.modal-text').html(data.description);
                            $$('.form_dangnhap').parent().children('.modal-text').css('color','green');
                            localStorage.setItem("login",username);
                            myApp.closeModal(modal);
                            var ds_taisan = data.data;

                            if(ds_taisan.length == 0){
                                open_modal_add_taisan('Để sau',"OK");
                            }else{
                                window.db.insert_list_taisan(ds_taisan,function(){
                                    // showlog("callback insert taisan");
                                    load_tatca_danhsach_thongbao(function(){
                                        // showlog("callback insert thong bao");
                                        load_loaidichvu(function(){
                                            // showlog("callback insert loai dich vu");
                                            //  myApp.closeModal(modal);
                                        });
                                        capNhatSoLuongThongBaoMoi();
                                    });
                                });
                            }
                            initNotification();
                        }else{
                            $$('.form_dangnhap').parent().children('.modal-text').html(data.description);
                            $$('.form_dangnhap').parent().children('.modal-text').css('color','red');
                            return;
                        }
                    });
                }
            },
        ]
    });
}

function open_modal_dangky(){
    var $$ = Dom7;
    var myApp = new Framework7({
        pushState : true,
        swipeBackPage: false,
    });
    var modal = myApp.modal({
        title: 'Đăng ký',
        text: ' ',
        afterText:  '<form class="form_dangky" autocomplete="off">'+
        '<div class="list-block">'+
        // '<label for="input_sodienthoai">Số điện thoại :</label>'+
        '<input class="input_username" type="text" name="input_username" value="" placeholder="Nhập số điện thoại" autocomplete="off">'+
        // '<label for="input_matkhau">Mật khẩu :</label>'+
        '<input class="input_matkhau" type="password" name="input_matkhau" value="" placeholder="Mật khẩu" autocomplete="off">'+
        '<input class="input_re_matkhau" type="password" name="input_re_matkhau" value="" placeholder="Nhập lại mật khẩu" autocomplete="off">'+
        '</div>'+
        '</form>',
        buttons: [
            {
                text: 'Quay lại',
                close: true,
                onClick: function () {
                    open_modal_dangnhap();
                }
            },
            {
                text: 'Đăng ký',
                bold: true,
                close: false,
                onClick: function () {
                    var username = $$('.form_dangky .input_username').val().trim();
                    var matkhau = $$('.form_dangky .input_matkhau').val().trim();
                    var rematkhau = $$('.form_dangky .input_re_matkhau').val().trim();

                    if(username==''){
                        $$('.form_dangky').parent().children('.modal-text').html('Số điện thoại không được để trống!');
                        $$('.form_dangky').parent().children('.modal-text').css('color','red');
                        return;
                    }
                    if(matkhau==''){
                        $$('.form_dangky').parent().children('.modal-text').html('Điền mật khẩu của bạn!');
                        $$('.form_dangky').parent().children('.modal-text').css('color','red');
                        return;
                    }

                    if(rematkhau==''){
                        $$('.form_dangky').parent().children('.modal-text').html('Nhập lại mật khẩu của bạn!');
                        $$('.form_dangky').parent().children('.modal-text').css('color','red');
                        return;
                    }

                    if(matkhau!=rematkhau){
                        $$('.form_dangky').parent().children('.modal-text').html('Mật khẩu nhập lại phải trùng với mật khẩu đã nhập!');
                        $$('.form_dangky').parent().children('.modal-text').css('color','red');
                        return;
                    }

                    register(username,matkhau,function(data){
                        if(data.code == 1){
                            // dang ky thanh công
                            $$('.form_dangky').parent().children('.modal-text').html(data.description);
                            $$('.form_dangky').parent().children('.modal-text').css('color','green');
                            $$('.form_dangky .input_matkhau').val("");
                            $$('.form_dangky .input_re_matkhau').val("");
                        }else{
                            $$('.form_dangky').parent().children('.modal-text').html(data.description);
                            $$('.form_dangky').parent().children('.modal-text').css('color','red');
                            return;
                        }
                    });
                }
            },
        ]
    });
}

function kiemTraTrangThaiApp(callback){
    // showlog("kiem tra trang thai app");
    ws_get_kiemTraVersion(function(data){
        // showlog("Callback ws kiem tra version");
        // showlog(data);
        if(parseInt(data.code)!='1'){
            var myApp = new Framework7();
            myApp.modal({
                title:  "Thông báo",
                text: "Có lỗi trong quá trình xử lý. Vui lòng cài đặt lại ứng dụng để tiếp tục sử dụng",
                buttons: [
                    {
                        text: "OK",
                        onClick: function() {
                            kiemTraTrangThaiApp(callback);
                        }
                    }
                ]
            });
        }else{
            switch(data.data.trangthai){
                case 'running':
                    callback();
                    break;
                case 'alert':
                    if(data.data.tieptuc == "1" ){
                        var myApp = new Framework7();
                        myApp.modal({
                            title:  data.data.thongbao_tieude,
                            text: data.data.thongbao_noidung,
                            buttons: [
                                {
                                    text: data.data.thongbao_button,
                                    onClick: function() {
                                        callback();
                                    }
                                }
                            ]
                        });
                    }else{
                        var myApp = new Framework7();
                        myApp.modal({
                            title:  data.data.thongbao_tieude,
                            text: data.data.thongbao_noidung,
                            buttons: [
                                {
                                    text: data.data.thongbao_button,
                                    onClick: function() {
                                        kiemTraTrangThaiApp(callback);
                                    }
                                }
                            ]
                        });
                    }
                    break;
            }
        }

    });
}

function dangxuat(){
    localStorage.removeItem('login');
    localStorage.removeItem('taisan_active');
    window.db.delete_taisan_all(function(){
        window.location.reload();
    });
}

// hienThiDanhSachTaiKhoan => dùng cho chức năng thêm xóa tài khoản
function hienThiDanhSachTaiSan(){
    var $$ = Dom7;
    $$('.page-ds-taisan .ds_taisan ul').html("");
    var username = localStorage.getItem("login");
    window.db.selete_ds_taikhoan_chitiet(username,function(ds_taisan){
        // showlog("Callback Danh sach taikhoan_chitiet");
        for(var i=0;i<ds_taisan.length;i++){
            var taisan = ds_taisan[i];
            var row = '<li class="swipeout">'+
                '<div class="swipeout-content item-inner">'+
                //'<div class="item-inner>'+
                '<div class="item-title" >Chủ sở hữu: '+taisan.ten_khang+'</div>'+
                '<div class="item-subtitle">Mã : '+taisan.ma_canho+'</div>'+
                '<div class="item-subtitle">Dự án : '+taisan.ten_duan+'</div>'+
                '<div class="item-subtitle">Địa chỉ : '+taisan.diachi_duan+'</div>'+
                //'</div>'+
                '</div>'+

                '<div class="swipeout-actions-right">'+
                '<a href="#" class="button-xoataikhoan" onclick="click_xoaTaiSan(this,\''+taisan.id+'\');" data-confirm="Bạn có chắc là muốn thực hiện xóa thông tin khỏi ứng dụng ?" data-confirm-title="Cảnh báo?">Xóa</a>'+
                '</div>'+
                '</li>';

            $$('.page-ds-taisan .ds_taisan ul').append(row);
            $$('.page-ds-taisan .thongbao_khongcotaisan').css('display','none');
        }

        if(ds_taisan.length == 0){
            $$('.page-ds-taisan .thongbao_khongcotaisan').css('display','block');
        }
    });


}

function open_modal_add_taisan(btn_cancel,btn_OK){
    var $$ = Dom7;
    var myApp = new Framework7({
        pushState : true,
        swipeBackPage: false,
    });
    var modal = myApp.modal({
        title: 'Nhập thông tin',
        text: 'Nhập mã căn hộ/văn phòng/khu thương mại',
        afterText:  '<form class="form_add_taisan" autocomplete="off">'+
        '<div class="list-block">'+
        // '<label for="input_sodienthoai">Số điện thoại :</label>'+
        '<input class="input_ma_canho" type="text" name="input_ma_canho" value="" placeholder="Nhập mã căn hộ" autocomplete="off">'+
        '</div>'+
        '</form>',
        buttons: [
            {
                text: btn_cancel,
                close: true,
                onClick: function () {
                }
            },
            {
                text: btn_OK,
                bold: true,
                close: false,
                onClick: function () {
                    var ma_canho = $$('.form_add_taisan .input_ma_canho').val().trim();
                    var username = localStorage.getItem("login");
                    if(ma_canho==''){
                        $$('.form_add_taisan').parent().children('.modal-text').html('Vui lòng nhập mã căn hộ/văn phòng hoặc khu thương mại cần quản lý !');
                        $$('.form_add_taisan').parent().children('.modal-text').css('color','red');
                        return;
                    }
                    ws_add_taisan(username,ma_canho,function(data){
                        if(data.code == 1){
                            // dang ky thanh công
                            $$('.form_add_taisan').parent().children('.modal-text').html(data.description);
                            $$('.form_add_taisan').parent().children('.modal-text').css('color','green');
                            var list_taisan = [];
                            list_taisan.push(data.data);
                            window.db.insert_list_taisan(list_taisan,function(){
                                hienThiDanhSachTaiSan();
                                myApp.closeModal(modal);
                            });

                        }else{
                            $$('.form_add_taisan').parent().children('.modal-text').html(data.description);
                            $$('.form_add_taisan').parent().children('.modal-text').css('color','red');
                            return;
                        }
                    });
                }
            },
        ]
    });
}

function click_xoaTaiSan(e,id){
    var myApp = new Framework7();
    var $$ = Dom7;

    var modal = myApp.modal({
        title: 'Xác nhận !',
        text: 'Bạn có chắc là muốn thực hiện xóa thông tin khỏi ứng dụng ?',
        buttons: [
            {
                text: 'Quay lại',
                close: true,
                onClick: function () {
                }
            },
            {
                text: 'Đồng ý',
                bold: true,
                close: true,
                onClick: function () {
                    ws_xoaTaiSan(id,function(data){
                        if(parseInt(data.code) == 1 ){
                            window.db.delete_taisan(id,function(){
                                myApp.swipeoutDelete($$(e).parent().parent());

                                // kiem tra neu xoa ngay tai sản đang chọn thì remove chọn
                                var id_taisan = localStorage.getItem('taisan_active');
                                if(id_taisan == id){
                                    localStorage.removeItem('taisan_active');
                                }

                            });
                        }
                    });
                }
            },
        ]
    });





}

function capnhat_danhsach_taisan(){
    var $$ = Dom7;
    var myApp = new Framework7({
        pushState : true,
        swipeBackPage: false,
    });
    var username = localStorage.getItem('login');
    ws_lay_ds_taisan(username,function(data){
        if(parseInt(data.code)==1){
            var ds_taisan = data.data;
            window.db.delete_taisan_all(function(){
                if(ds_taisan != null){
                    window.db.insert_list_taisan(ds_taisan,function(){
                        hienThiDanhSachTaiSan();
                    });
                }
            });
        }
    });
}

function load_tatca_danhsach_thongbao(callback) {
    var $$ = Dom7;
    var myApp = new Framework7({
        pushState : true,
        swipeBackPage: false,
    });
    var username = localStorage.getItem('login');
    ws_lay_ds_tatca_thongbao(username,function(data){
        if(parseInt(data.code)==1){
            var ds_thongbao = data.data;
            window.db.delete_thongbao_all(function(){
                window.db.insert_list_thongbao(ds_thongbao,function(){
                    callback();
                });
            });
        }
    });
}

function load_capNhatThongBaoMoi() {
    var $$ = Dom7;
    var myApp = new Framework7({
        pushState : true,
        swipeBackPage: false,
    });
    var username = localStorage.getItem('login');
    window.db.selete_max_ngay_thongbao(username,function(max_ngay){
        if(max_ngay==null){
            load_tatca_danhsach_thongbao(function(){
                capNhatSoLuongThongBaoMoi();
            });
        }else{
            ws_lay_ds_thongbao_moi(username,max_ngay,function(data){
                if(parseInt(data.code)==1){
                    var ds_thongbao = data.data;
                    window.db.delete_list_thongbao(ds_thongbao,function(){
                        window.db.insert_list_thongbao(ds_thongbao,function(){
                            capNhatSoLuongThongBaoMoi();
                        });
                    });
                }
            });
        }
    });
}

function dongbo_thongbao_daxem() {
    var $$ = Dom7;
    var myApp = new Framework7({
        pushState : true,
        swipeBackPage: false,
    });

    var username = localStorage.getItem('login');
    window.db.selete_ds_thongbao_dongbo(username,function(data){
        console.log(1);
        ws_capnhat_thongbao_daxem(username,data,function(data){
            console.log(2);
            if(parseInt(data.code)==1){
                load_capNhatThongBaoMoi();
            }
        });
    });
}

function load_loaidichvu(callback) {
    var $$ = Dom7;
    var myApp = new Framework7({
        pushState : true,
        swipeBackPage: false,
    });
    ws_lay_ds_loaidichvu(function(data){
        if(parseInt(data.code)==1){
            var ds_dichvu = data.data;
            window.db.delete_all_loaidichvu(function(){
                window.db.delete_all_cskh_danhmuc_dichvu(function(){
                    window.db.delete_all_cskh_danhmuc_dichvu_chitiet(function(){
                        window.db.insert_list_loaidichvu(ds_dichvu['loaidichvu'],function(){
                            window.db.insert_list_danhmuc_dichvu(ds_dichvu['danhmuc_loaidichvu'],function(){
                                window.db.insert_list_danhmuc_dichvu_chitiet(ds_dichvu['danhmuc_loaidichvu_chitiet'],function(){
                                    callback();
                                });
                            });
                        });
                    });
                });

            });
        }
    });
}

function hienThiTaiSanDangChon(callback){
    var $$ = Dom7;
    var myApp = new Framework7({
        pushState : true,
        swipeBackPage: false,
    });

    var id_taisan = localStorage.getItem('taisan_active');
    if(id_taisan=="" || id_taisan == null || typeof (id_taisan) == "undefined" ){
        // lay thong tin 1 tai san bat ky
        window.db.selete_taikhoan_chitiet_top(function(thongtinTaiSan){
            // console.log(thongtinTaiSan);
            if(thongtinTaiSan.length != 0){
            //    showlog("khong co tai san");
                $$('.taiSanDangChon .ten_chusohuu_dangchon').html("Chủ sở hữu: "+thongtinTaiSan['ten_khang']);
                $$('.taiSanDangChon .ma_canho_dangchon').html("Mã: "+thongtinTaiSan['ma_canho']);
                $$('.taiSanDangChon .diachi_canho_dangchon').html("Địa chỉ: "+thongtinTaiSan['diachi_duan']);
                localStorage.setItem('taisan_active',thongtinTaiSan['id']);
            }else{
                $$('.taiSanDangChon .ten_chusohuu_dangchon').html("Chủ sở hữu: Không xác định");
                $$('.taiSanDangChon .ma_canho_dangchon').html("Mã: Không xác định");
                $$('.taiSanDangChon .diachi_canho_dangchon').html("Địa chỉ: Không xác định");
                localStorage.removeItem('taisan_active');
            }
            callback(thongtinTaiSan);
        });
    }else{
        // lay thong tin tai san đã active
        window.db.selete_taikhoan_chitiet(id_taisan,function(thongtinTaiSan){
            // console.log(thongtinTaiSan);
            $$('.taiSanDangChon .ten_chusohuu_dangchon').html("Chủ sở hữu: "+thongtinTaiSan['ten_khang']);
            $$('.taiSanDangChon .ma_canho_dangchon').html("Mã: "+thongtinTaiSan['ma_canho']);
            $$('.taiSanDangChon .diachi_canho_dangchon').html("Địa chỉ: "+thongtinTaiSan['diachi_duan']);
            callback(thongtinTaiSan);
        });
    }

}

function hienthi_page_chonTaiSan(){
    var $$ = Dom7;
    var myApp = new Framework7();
    // lay thong tin khach hang dang active
    var id_taisan = localStorage.getItem('taisan_active');

    $$('.page-chonTaiSan .ds_taisan ul').html("");

    var username = localStorage.getItem("login");
    window.db.selete_ds_taikhoan_chitiet(username,function(ds_taisan){
        // showlog("Callback Danh sach taikhoan_chitiet");
        var selected_taiSan="";
        for(var i=0;i<ds_taisan.length;i++){
            var taisan = ds_taisan[i];

            if(id_taisan == taisan['id']){
                selected_taiSan = "selected_taisan";
            }else{
                selected_taiSan = "";
            }
            var row = '<li>'+
                '<a href="#" onclick="click_chonTaiSan('+taisan['id']+',this);" class="item-link">'+
                '<div class="item-inner '+selected_taiSan+' ">'+
                    '<div class="item-title" >Chủ sở hữu: '+taisan.ten_khang+'</div>'+
                    '<div class="item-subtitle">Mã : '+taisan.ma_canho+'</div>'+
                    '<div class="item-subtitle">Dự án : '+taisan.ten_duan+'</div>'+
                    '<div class="item-subtitle">Địa chỉ : '+taisan.diachi_duan+'</div>'+
                '</div>'+
                '</a>'+
                '</li>';

            $$('.page-chonTaiSan .ds_taisan ul').append(row);
        }

        if(ds_taisan.length == 0){
            $$('.page-chonTaiSan .thongbao_khongcotaisan').css('display','block');
        }
    });
}

function click_chonTaiSan(id,me){
    var $$ = Dom7;
    localStorage.setItem('taisan_active',id);
    hienThiTaiSanDangChon(function(thongTinTaiSan){});
    $$('.ds_taisan .item-inner').removeClass("selected_taisan");
    $$($$(me).children('.item-inner')).addClass("selected_taisan");

    hienthi_selectbox_loaidichvu(".page-dangKyDichVu .input_dichvu","dichvu");
    hienthi_selectbox_loaidichvu(".page-phanAnhGopY .input_dichvu","phanAnhGopY");

}

function hienthi_selectbox_loaidichvu(target,loai){
    var $$ = Dom7;
    var myApp = new Framework7();
    $$(target).html("");

    // lay thong tin tai san dang chon
    var id_taisan = localStorage.getItem('taisan_active');
    if(id_taisan=="" || id_taisan == null || typeof (id_taisan) == "undefined" ){
        // lay thong tin 1 tai san bat ky
        window.db.selete_taikhoan_chitiet_top(function(thongtinTaiSan){
            window.db.selete_ds_danhmuc_dichvu(thongtinTaiSan.id_duan,loai,function(ds_danhmuc){
                if(ds_danhmuc.length>0){
                    var group_name ="";
                    var stt_group = -1;
                    for(var i=0;i<ds_danhmuc.length;i++){
                        if(group_name != ds_danhmuc[i]['nhom']){
                            stt_group++;
                            group_name = ds_danhmuc[i]['nhom'];
                            myApp.smartSelectAddOption(target, '<optgroup label="'+group_name+'"></optgroup>');
                        }
                        myApp.smartSelectAddOption($$(target+' optgroup').eq(stt_group),'<option value="'+ds_danhmuc[i]['ma']+'">'+ds_danhmuc[i]['mota']+'</option>');

                    }
                }else{
                    $$('#name_select_loaiyeucau').html("");
                }
            });
        });
    }else{
        window.db.selete_taikhoan_chitiet(id_taisan,function(thongtinTaiSan){
            window.db.selete_ds_danhmuc_dichvu(thongtinTaiSan.id_duan,loai,function(ds_danhmuc){
                if(ds_danhmuc.length>0){
                    var group_name ="";
                    var stt_group = -1;
                    for(var i=0;i<ds_danhmuc.length;i++){
                        if(group_name != ds_danhmuc[i]['nhom']){
                            stt_group++;
                            group_name = ds_danhmuc[i]['nhom'];
                            myApp.smartSelectAddOption(target, '<optgroup label="'+group_name+'"></optgroup>');
                        }
                        myApp.smartSelectAddOption($$(target+' optgroup').eq(stt_group),'<option value="'+ds_danhmuc[i]['ma']+'">'+ds_danhmuc[i]['mota']+'</option>');
                    }
                }else{
                    $$('#name_select_loaiyeucau').html("");
                }
            });
        });
    }


}


function click_guiPhanAnhGopY(){
    var $$ = Dom7;
    var myApp = new Framework7();
    var id_taikhoan_chitiet = localStorage.getItem('taisan_active');
    if(id_taikhoan_chitiet == null){
        id_taikhoan_chitiet = 0;
    }

    var ten_nguoi_yeucau = $$('.page-phanAnhGopY .form_input .ten_nguoiyeucau').val().trim();
    var dienthoai_lienhe = $$('.page-phanAnhGopY .form_input .dienthoai_lienhe').val().trim();
    var dichvu = $$('.page-phanAnhGopY .form_input .input_dichvu').val();
    var noidung = $$('.page-phanAnhGopY .form_input .input_noidung').val().trim();

    if(dichvu==""){
        myApp.modal({
            title:  "Lời nhắc",
            text: "Căn hộ của bạn hiện chưa hỗ trợ dịch vụ này !.Khi có nhu cầu vui lòng liên hệ ban quản lý. Xin cảm ơn.",
            buttons: [
                {
                    text: "Đồng ý",
                    onClick: function() {
                    }
                }
            ]
        });

        return;
    }

    if(ten_nguoi_yeucau==""){
        myApp.modal({
            title:  "Lời nhắc",
            text: "Vui lòng nhập tên người phản ánh, góp ý !",
            buttons: [
                {
                    text: "Đồng ý",
                    onClick: function() {
                    }
                }
            ]
        });

        return;
    }

    if(dienthoai_lienhe==""){
        myApp.modal({
            title:  "Lời nhắc",
            text: "Vui lòng nhập số điện thoại liên hệ !",
            buttons: [
                {
                    text: "Đồng ý",
                    onClick: function() {
                    }
                }
            ]
        });

        return;
    }

    if(noidung==""){
        myApp.modal({
            title:  "Lời nhắc",
            text: "Vui lòng nhập nội dung cần phản ánh, góp ý !",
            buttons: [
                {
                    text: "Đồng ý",
                    onClick: function() {
                    }
                }
            ]
        });

        return;
    }

    var username = localStorage.getItem('login');
    ws_gui_phanAnhGopY({
        'username' : username,
        'id_taikhoan_chitiet' : id_taikhoan_chitiet,
        'ten_nguoiyeucau' : ten_nguoi_yeucau,
        'dienthoai_lienhe' : dienthoai_lienhe,
        'dichvu' : dichvu,
        'noidung' : noidung,
    },function(data){
        if(data.code==1){
            var myApp = new Framework7();
            myApp.modal({
                title:  "Thông báo",
                text: data.description,
                buttons: [
                    {
                        text: "OK",
                        onClick: function() {

                        }
                    }
                ]
            });
        }else{
            var myApp = new Framework7();
            myApp.modal({
                title:  "Thông báo",
                text: data.description,
                buttons: [
                    {
                        text: "OK",
                        onClick: function() {

                        }
                    }
                ]
            });
        }
    });
}

function click_guiDangKyDichVu(){
    var $$ = Dom7;
    var myApp = new Framework7();
    var id_taikhoan_chitiet = localStorage.getItem('taisan_active');
    if(id_taikhoan_chitiet == null){
        id_taikhoan_chitiet = 0;
    }

    var ten_nguoi_yeucau = $$('.page-dangKyDichVu .form_input .ten_nguoiyeucau').val().trim();
    var dienthoai_lienhe = $$('.page-dangKyDichVu .form_input .dienthoai_lienhe').val().trim();
    var dichvu = $$('.page-dangKyDichVu .form_input .input_dichvu').val();
    var noidung = $$('.page-dangKyDichVu .form_input .input_noidung').val().trim();

    if(dichvu==""){
        myApp.modal({
            title:  "Lời nhắc",
            text: "Căn hộ của bạn hiện chưa hỗ trợ dịch vụ này !.Khi có nhu cầu vui lòng liên hệ ban quản lý. Xin cảm ơn.",
            buttons: [
                {
                    text: "Đồng ý",
                    onClick: function() {
                    }
                }
            ]
        });

        return;
    }

    if(ten_nguoi_yeucau==""){
        myApp.modal({
            title:  "Lời nhắc",
            text: "Vui lòng nhập tên người liên hệ !",
            buttons: [
                {
                    text: "Đồng ý",
                    onClick: function() {
                    }
                }
            ]
        });

        return;
    }

    if(dienthoai_lienhe==""){
        myApp.modal({
            title:  "Lời nhắc",
            text: "Vui lòng nhập số điện thoại liên hệ !",
            buttons: [
                {
                    text: "Đồng ý",
                    onClick: function() {
                    }
                }
            ]
        });

        return;
    }

    if(noidung==""){
        myApp.modal({
            title:  "Lời nhắc",
            text: "Vui lòng nhập mô tả nội dung cần đăng ký!",
            buttons: [
                {
                    text: "Đồng ý",
                    onClick: function() {
                    }
                }
            ]
        });

        return;
    }

    var username = localStorage.getItem('login');
    ws_gui_dangKyDichVu({
        'username' : username,
        'id_taikhoan_chitiet' : id_taikhoan_chitiet,
        'ten_nguoiyeucau' : ten_nguoi_yeucau,
        'dienthoai_lienhe' : dienthoai_lienhe,
        'dichvu' : dichvu,
        'noidung' : noidung,
    },function(data){
        if(data.code==1){
            var myApp = new Framework7();
            myApp.modal({
                title:  "Thông báo",
                text: data.description,
                buttons: [
                    {
                        text: "OK",
                        onClick: function() {

                        }
                    }
                ]
            });
        }else{
            var myApp = new Framework7();
            myApp.modal({
                title:  "Thông báo",
                text: data.description,
                buttons: [
                    {
                        text: "OK",
                        onClick: function() {

                        }
                    }
                ]
            });
        }
    });
}

function tracuu_phiquanly() {
    var $$ = Dom7;
    var myApp = new Framework7();
    // lay thong tin can ho
    var id = localStorage.getItem('taisan_active');
    var thang = $$('.page-traCuuPhiQuanLy .form_tuychon .input_thang').val().trim();
    var nam = $$('.page-traCuuPhiQuanLy .form_tuychon .input_nam').val().trim();

        if(id != null && id != "" && typeof (id) != 'undefined'){
            $$('.page-traCuuPhiQuanLy .thongbao_khongcotaisan').css('display','none');
            window.db.selete_thongtin_taikhoan_chitiet(id,function(data_taikhoan_chitiet){
                ws_lay_ds_phidichvu(data_taikhoan_chitiet['ma_canho'],thang,nam,function(data){
                //      ws_lay_ds_phidichvu('03.01',thang,nam,function(data){
                    if(data.code=='1'){
                        if(data.data.length==0){
                            $$('.page-traCuuPhiQuanLy .ketqua').html('<div align="center">Chưa có thông tin</div>');
                            $$('.page-traCuuPhiQuanLy .ketqua').css('display','block');
                        }else{
                            for(var i=0;i<data.data.length;i++){
                                var ketqua = data.data[i];
                                $$('.page-traCuuPhiQuanLy .ketqua').html('');
                                $$('.page-traCuuPhiQuanLy .ketqua').append("<div class='item'><div class='left'>Diện tích:</div><div class='right'>"+ketqua.DIENTICH+"</div><div class='clear_both'></div></div>");
                                $$('.page-traCuuPhiQuanLy .ketqua').append("<div class='item'><div class='left'>Đơn giá:</div><div class='right'>"+ketqua.DONGIA_DIENTICH+"</div><div class='clear_both'></div></div>");
                                $$('.page-traCuuPhiQuanLy .ketqua').append("<div class='item'><div class='left'>Hệ số nhân:</div><div class='right'>"+ketqua.HESONHAN+"</div><div class='clear_both'></div></div>");
                                $$('.page-traCuuPhiQuanLy .ketqua').append("<div class='item'><div class='left'>Tổng tiền:</div><div class='right'>"+ketqua.TIEN_DICHVU+" VNĐ</div><div class='clear_both'></div></div>");
                                $$('.page-traCuuPhiQuanLy .ketqua').append("<div class='clear_both'></div>");
                                $$('.page-traCuuPhiQuanLy .ketqua').css('display','block');
                            }
                        }
                    }else{
                        myApp.modal({
                            title:  "Thông báo",
                            text: data.description,
                            buttons: [
                                {
                                    text: "OK",
                                    onClick: function() {

                                    }
                                }
                            ]
                        });
                    }
                });
            });

        }else{
            $$('.page-traCuuPhiQuanLy .thongbao_khongcotaisan').css('display','block');
        }

}

function tracuu_thongTinDienNuoc() {
    var $$ = Dom7;
    var myApp = new Framework7();
    // lay thong tin can ho
    var id = localStorage.getItem('taisan_active');
    var thang = $$('.page-traCuuThongTinDienNuoc .form_tuychon .input_thang').val().trim();
    var nam = $$('.page-traCuuThongTinDienNuoc .form_tuychon .input_nam').val().trim();

    if(id != null && id != "" && typeof (id) != 'undefined'){
        $$('.page-traCuuThongTinDienNuoc .thongbao_khongcotaisan').css('display','none');
        window.db.selete_thongtin_taikhoan_chitiet(id,function(data_taikhoan_chitiet){
            // console.log(data_taikhoan_chitiet);
            ws_lay_ds_thongTinDienNuoc(data_taikhoan_chitiet['ma_canho'],thang,nam,function(data){
           // ws_lay_ds_thongTinDienNuoc('03.01',thang,nam,function(data){
                if(data.code=='1'){
                    if(data.data.length==0){
                        $$('.page-traCuuThongTinDienNuoc .ketqua_diennuoc').html('<div class="ketqua" style="margin-top: 20px;" align="center">Chưa có thông tin</div>');
                        $$('.page-traCuuThongTinDienNuoc .ketqua_diennuoc').css('display','block');
                    }else{
                        for(var i =0;i<data.data.length;i++){
                            var ketqua = data.data[i];
                            $$('.page-traCuuThongTinDienNuoc .ketqua_diennuoc').html('');
                            var tiendien = "<div class='ketqua'>";
                            tiendien += "<div class='item' style='color: #0c82df; text-align: center;text-transform: uppercase;'>Thông tin tiền điện </div>";
                            tiendien += "<div class='item'><div class='left'>Chỉ số cũ:</div><div class='right'>"+ketqua.TIENDIEN_CSC+"</div><div class='clear_both'></div></div>";
                            tiendien += "<div class='item'><div class='left'>Chỉ số mới:</div><div class='right'>"+ketqua.TIENDIEN_CSC+"</div><div class='clear_both'></div></div>";
                            tiendien += "<div class='item'><div class='left'>Điện tiêu thụ:</div><div class='right'>"+ketqua.TIENDIEN_TIEUTHU+"</div><div class='clear_both'></div></div>";
                            tiendien += "<div class='item'><div class='left'>Tiền thuế:</div><div class='right'>"+ketqua.TIENDIEN_VAT+"</div><div class='clear_both'></div></div>";
                            tiendien += "<div class='item'><div class='left'>Phí bảo vệ môi trường:</div><div class='right'>"+ketqua.TIENDIEN_BVMT+"</div><div class='clear_both'></div></div>";
                            tiendien += "<div class='item'><div class='left'>Thành tiền:</div><div class='right'>"+ketqua.TIENDIEN_THANHTIEN+" VNĐ</div><div class='clear_both'></div></div>";
                            tiendien += "<div class='clear_both'></div>";
                            tiendien+= "</div>";

                            var tiennuoc = "<div class='ketqua'>";
                            tiennuoc += "<div class='item' style='color: #0c82df; text-align: center;text-transform: uppercase;'>Thông tin tiền nước</div>";
                            tiennuoc += "<div class='item'><div class='left'>Chỉ số cũ:</div><div class='right'>"+ketqua.TIENNUOC_CSC+"</div><div class='clear_both'></div></div>";
                            tiennuoc += "<div class='item'><div class='left'>Chỉ số mới:</div><div class='right'>"+ketqua.TIENNUOC_CSM+"</div><div class='clear_both'></div></div>";
                            tiennuoc += "<div class='item'><div class='left'>Tiêu thụ:</div><div class='right'>"+ketqua.TIENNUOC_TIEUTHU+"</div><div class='clear_both'></div></div>";
                            tiennuoc += "<div class='item'><div class='left'>Tiền thuế:</div><div class='right'>"+ketqua.TIENNUOC_VAT+"</div><div class='clear_both'></div></div>";
                            tiennuoc += "<div class='item'><div class='left'>Thành tiền:</div><div class='right'>"+ketqua.TIENNUOC_THANHTIEN+" VNĐ</div><div class='clear_both'></div></div>";
                            tiennuoc += "<div class='clear_both'></div>";
                            tiennuoc += "</div>";

                            $$('.page-traCuuThongTinDienNuoc .ketqua_diennuoc').append(tiennuoc);
                            $$('.page-traCuuThongTinDienNuoc .ketqua_diennuoc').append(tiendien);
                            $$('.page-traCuuThongTinDienNuoc .ketqua_diennuoc').css('display','block');
                        }
                    }

                }else{
                    myApp.modal({
                        title:  "Thông báo",
                        text: data.description,
                        buttons: [
                            {
                                text: "OK",
                                onClick: function() {

                                }
                            }
                        ]
                    });
                }
            });
        });
    }else{
        $$('.page-traCuuThongTinDienNuoc .thongbao_khongcotaisan').css('display','block');
    }


}

function tracuu_cacPhiKhac(){
    var $$ = Dom7;
    var myApp = new Framework7();
    // lay thong tin can ho
    var id = localStorage.getItem('taisan_active');
    var thang = $$('.page-traCuuPhiKhac .form_tuychon .input_thang').val().trim();
    var nam = $$('.page-traCuuPhiKhac .form_tuychon .input_nam').val().trim();

    if(id != null && id != "" && typeof (id) != 'undefined'){
        $$('.page-traCuuPhiKhac .thongbao_khongcotaisan').css('display','none');
        window.db.selete_thongtin_taikhoan_chitiet(id,function(data_taikhoan_chitiet){
            // console.log(data_taikhoan_chitiet);
            ws_lay_ds_phiKhac(data_taikhoan_chitiet['ma_canho'],thang,nam,function(data){
                // ws_lay_ds_thongTinDienNuoc('03.01',thang,nam,function(data){
                if(data.code=='1'){
                    if(data.data.length==0){
                        $$('.page-traCuuPhiKhac .ketqua_phiKhac').html('<div class="ketqua" style="margin-top: 20px;" align="center">Chưa có thông tin</div>');
                        $$('.page-traCuuPhiKhac .ketqua_phiKhac').css('display','block');
                    }else{
                        for(var i =0;i<data.data.length;i++){
                            var ketqua = data.data[i];
                            $$('.page-traCuuPhiKhac .ketqua_phiKhac').html('');

                            var phikhac = "<div class='ketqua'>";
                            phikhac += "<div class='item' style='color: #0c82df; text-align: center;text-transform: uppercase;'>Thông tin các phí khác "+thang+"/"+nam +" </div>";
                            phikhac += "<div class='item'><div class='left'>Phí xe đạp:</div><div class='right'>"+ketqua.TIEN_XEDAP+"</div><div class='clear_both'></div></div>";
                            phikhac += "<div class='item'><div class='left'>Phí xe máy:</div><div class='right'>"+ketqua.TIEN_XEMAY+"</div><div class='clear_both'></div></div>";
                            phikhac += "<div class='item'><div class='left'>Phí ô tô:</div><div class='right'>"+ketqua.TIEN_OTO+"</div><div class='clear_both'></div></div>";

                            if(typeof (ketqua.DIEN_GIAI_PHI_KHAC) !== "undefined"){
                                phikhac += "<div class='item'><div class='left'>"+ketqua.DIEN_GIAI_PHI_KHAC+":</div><div class='right'>"+ketqua.PHI_KHAC+"</div><div class='clear_both'></div></div>";
                            }

                            phikhac += "<div class='item'><div class='left'>Tổng tiền:</div><div class='right'>"+ketqua.TONG_TIEN+" VNĐ</div><div class='clear_both'></div></div>";
                            phikhac += "<div class='clear_both'></div>";
                            phikhac+= "</div>";

                            $$('.page-traCuuPhiKhac .ketqua_phiKhac').append(phikhac);
                            $$('.page-traCuuPhiKhac .ketqua_phiKhac').css('display','block');
                        }
                    }

                }else{
                    myApp.modal({
                        title:  "Thông báo",
                        text: data.description,
                        buttons: [
                            {
                                text: "OK",
                                onClick: function() {

                                }
                            }
                        ]
                    });
                }
            });
        });
    }else{
        $$('.page-traCuuPhiKhac .thongbao_khongcotaisan').css('display','block');
    }
}

function hienThiThongTinUngDung(){
    var $$ = Dom7;
    $$('.page-thongtinungdung ul #nhaphattrien').html("Venuscorp");
    $$('.page-thongtinungdung ul #emaillienhe').html("info@venuscorp.vn");
    $$('.page-thongtinungdung ul #dienthoaihotro').html(window.appConfigs.dienthoai_tongdai);
    $$('.page-thongtinungdung ul #phienban').html(window.appConfigs.version);
    $$('.page-thongtinungdung ul #emei').html(window.appConfigs.IMEI);
}

function doimatkhau(){
    var $$ = Dom7;
    var myApp = new Framework7();
    var modal = myApp.modal({
        title: 'Đổi mật khẩu',
        text: ' ',
        afterText:  '<div class="list-block" id="form_doimatkhau">'+
        '<ul>'+
        '    <li>'+
        '      <div class="item-content">'+
        '       <div class="item-inner">'+
        '         <div class="item-input" >'+
        '           <input type="password" value="" id="form_matkhaucu" placeholder="Mật khẩu cũ"  >'+
        '         </div>'+
        '       </div>'+
        '       </div>'+
        '    </li>'+
        '    <li>'+
        '      <div class="item-content">'+
        '       <div class="item-inner">'+
        '         <div class="item-input"  >'+
        '           <input type="password" value="" id="form_matkhaumoi" placeholder="Mật khẩu mới" >'+
        '         </div>'+
        '       </div>'+
        '       </div>'+
        '    </li>'+
        '    <li>'+
        '      <div class="item-content">'+
        '       <div class="item-inner">'+
        '         <div class="item-input" >'+
        '           <input type="password" value="" id="form_matkhaumoi_nhaplai" placeholder="Nhập lại mật khẩu mới"  >'+
        '         </div>'+
        '       </div>'+
        '       </div>'+
        '    </li>'+
        '</ul>'+
        '</div>',
        buttons: [
            {
                text: 'Trở về',
                close: true,
            },
            {
                text: 'Lưu',
                bold: true,
                close: false,
                onClick: function () {
                    var matkhaucu = $$('#form_matkhaucu').val().trim();
                    var matkhaumoi = $$('#form_matkhaumoi').val().trim();
                    var matkhaumoi_nhaplai = $$('#form_matkhaumoi_nhaplai').val().trim();
                    if(matkhaucu==''){
                        //   myApp.alert('Nhập mật khẩu cũ!','Thông báo');
                        $$('#form_doimatkhau').parent().children('.modal-text').html("Nhập mật khẩu cũ!");
                        $$('#form_doimatkhau').parent().children('.modal-text').css('color','red');

                    }else if(matkhaumoi==''){
                        //    myApp.alert('Nhập mật khẩu mới!','Thông báo');
                        $$('#form_doimatkhau').parent().children('.modal-text').html("Nhập mật khẩu mới!");
                        $$('#form_doimatkhau').parent().children('.modal-text').css('color','red');
                    }else if(matkhaumoi_nhaplai==''){
                        //   myApp.alert('Nhập lại mật khẩu mới!','Thông báo');
                        $$('#form_doimatkhau').parent().children('.modal-text').html("Nhập lại mật khẩu mới!");
                        $$('#form_doimatkhau').parent().children('.modal-text').css('color','red');
                    }else if(matkhaumoi!=matkhaumoi_nhaplai){
                        //   myApp.alert('Mật khẩu mới chưa hợp lệ!','Thông báo');
                        $$('#form_doimatkhau').parent().children('.modal-text').html("Mật khẩu mới chưa hợp lệ!");
                        $$('#form_doimatkhau').parent().children('.modal-text').css('color','red');

                    }else{
                        var username = localStorage.getItem('login');
                        ws_doimatkhau(username,matkhaucu,matkhaumoi,function(data){
                            if(data.code!='1'){
                                $$('#form_doimatkhau').parent().children('.modal-text').html(data.description);
                                $$('#form_doimatkhau').parent().children('.modal-text').css('color','red');
                            }else{
                                $$('#form_doimatkhau').parent().children('.modal-text').html(data.description);
                                $$('#form_doimatkhau').parent().children('.modal-text').css('color','green');
                            }
                        });
                    }
                }
            },
        ]
    });
}

function initNotification() {
  //  showlog("initNotification 1");
    try{
        window.appConfigs.push = PushNotification.init({
            android: {
                "senderID": window.appConfigs.senderID  // VENUS-CSKH
            },
            ios: {
                "sound": true,
                "alert": true,
                "badge": true,
            },
            windows: {}
        });
        //    showlog("initNotification 2");
        window.appConfigs.push.on('registration', function (data) {
            //    showlog("push on");
            //    showlog("registration event: " + data.registrationId);
            var username = localStorage.getItem('login');
            ws_capNhatToken(username, data.registrationId,function(){});
        });

        window.appConfigs.push.on('error', function (e) {
            //    showLog(" on  error");
            //    showLog(e);
        });

        window.appConfigs.push.on('notification', function (data) {
            //    showlog('notification event');
            var myApp = new Framework7();
            myApp.addNotification({
                title: 'Thông báo !',
                message: data.message
            });

        });
    }catch (e) {
    //    showlog("Error call PushNotification");
    }

}

function capNhatSoLuongThongBaoMoi(){
    var $$ = Dom7;
    var username = localStorage.getItem('login');
    window.db.select_soluong_thongbaoChuaXem(username,function(data){
        var tong = 0;
        $$('#tab_thongbao a .item-title').css('font-weight','normal');
        $$('#tab_thongbao a .item-after').html('');

        for(var i = 0;i< data.length;i++){
            switch(data[i].loaithongbao){
                case '1': case 1:
                    $$('#badge_thongBaoChung').html('<span class="badge">'+data[i].soluong+'</span>');
                    $$('#badge_thongBaoChung').parent().children('.item-title').css('font-weight','bolder');
                break;
                case '2':case 2:
                    $$('#badge_phiQuanLy').html('<span class="badge">'+data[i].soluong+'</span>');
                    $$('#badge_phiQuanLy').parent().children('.item-title').css('font-weight','bolder');
                break;
                case '3':case 3:
                    $$('#badge_phiDienNuoc').html('<span class="badge">'+data[i].soluong+'</span>');
                    $$('#badge_phiDienNuoc').parent().children('.item-title').css('font-weight','bolder');
                break;
                case '4':case 4:
                    $$('#badge_baoTriSuaChua').html('<span class="badge">'+data[i].soluong+'</span>');
                    $$('#badge_baoTriSuaChua').parent().children('.item-title').css('font-weight','bolder');
                break;
                case '5':case 5:
                    $$('#badge_tienDoDichVu').html('<span class="badge">'+data[i].soluong+'</span>');
                    $$('#badge_tienDoDichVu').parent().children('.item-title').css('font-weight','bolder');
                break;
            }
            tong += data[i].soluong;
        }
        if(tong>0){
            $$('#badge_thongbao').html(tong);
            $$('#badge_thongbao').removeClass('display_none');
            try{
                // console.log("capNhatSoLuongThongBaoMoi > 0");
                window.appConfigs.push.setApplicationIconBadgeNumber(function() {}, function() {}, tong);
            }catch (e){

            }
        }else{
            $$('#badge_thongbao').html(0);
            $$('#badge_thongbao').addClass('display_none');
            try{
                // console.log("capNhatSoLuongThongBaoMoi 0");
                window.appConfigs.push.setApplicationIconBadgeNumber(function() {}, function() {}, 0);
            }catch (e){

            }
        }
    });

}

function onCallError(result) {
    var myApp = new Framework7();
    var $$ = Dom7;

    myApp.modal({
        title: 'Thông báo !',
        text: 'Không thể thực hiện cuộc gọi !'+ result,
        buttons: [
            {
                text: 'OK',
                close: true,
                onClick: function () {
                }
            },
        ]
    });
}

function onCallSuccess(result) {
    showlog("Goi dien thanh cong"+ result);
}

function call_tongdai(){
    var myApp = new Framework7();
    myApp.modal({
        title:  "Gọi tổng đài",
        text: "Thực hiện cuộc gọi đến tổng đài chăm sóc khách hàng "+window.appConfigs.dienthoai_tongdai,
        buttons: [
            {
                text: "Quay lại",
                onClick: function() {

                }
            },
            {
                text: "Gọi",
                onClick: function() {
                    window.plugins.CallNumber.callNumber(onCallSuccess,onCallError,window.appConfigs.dienthoai_tongdai,true);
                }
            }

        ]
    });
}

function onResume(){
    showlog("On Resume");
   load_capNhatThongBaoMoi();
   load_loaidichvu(function(){});
}

/*

/!* ##################################################################################################### *!/
//

function hienThiLichGhiDien(thang,nam,ma_khang){
    var $$ = Dom7;
    $$('.thongtin_lichGhiDien').html("");
    ws_get_LichGhiDien(nam,thang,ma_khang,function(data){
    //    console.log(data.data);
        if(data.code==1 || data.code=='1'){
            $$('.thongtin_lichGhiDien').html("");
            if(data.data!=null||data.data!=''){
                for(var i=0;i<data.data.length;i++){
                    var ky = '<li class="item-content">';
                    ky+='<div class="item-inner">';
                    ky+='    <div class="item-title">Kỳ</div>';
                    ky+='<div class="item-after">'+data.data[i].KY+'</div>';
                    ky+='    </div>';
                    ky+='    </li>';

                    var ngayghidien = '<li class="item-content">';
                    ngayghidien+='<div class="item-inner">';
                    ngayghidien+='    <div class="item-title">Ngày ghi điện</div>';
                    ngayghidien+='<div class="item-after">'+data.data[i].NGAYGHI+'</div>';
                    ngayghidien+='    </div>';
                    ngayghidien+='    </li>';

                    var ngaythutien = '<li class="item-content">';
                    ngaythutien+='<div class="item-inner">';
                    ngaythutien+='    <div class="item-title">Ngày thu tiền</div>';
                    ngaythutien+='<div class="item-after">'+data.data[i].NGAYTHU+'</div>';
                    ngaythutien+='    </div>';
                    ngaythutien+='    </li>';

                    var kyhanthanhtoan = '<li class="item-content">';
                    kyhanthanhtoan+='<div class="item-inner">';
                    kyhanthanhtoan+='    <div class="item-title">Kỳ hạn thanh toán</div>';
                    kyhanthanhtoan+='<div class="item-after">'+data.data[i].KYHANTHANHTOAN+'</div>';
                    kyhanthanhtoan+='    </div>';
                    kyhanthanhtoan+='    </li>';

                    var kyhancatdien = '<li class="item-content">';
                    kyhancatdien+='<div class="item-inner">';
                    kyhancatdien+='    <div class="item-title">Kỳ hạn cắt điện</div>';
                    kyhancatdien+='<div class="item-after">'+data.data[i].KYHANCATDIEN+'</div>';
                    kyhancatdien+='    </div>';
                    kyhancatdien+='    </li>';

                    var item = '<div class="list-block inset">'+
                        '<ul>'+
                        ky+ngayghidien+ngaythutien+kyhanthanhtoan+kyhancatdien+
                        '</ul>'+
                        '</div>';

                    $$('.thongtin_lichGhiDien').append(item);

                }
            }
        }else{
            var khongcothongtin = '<li class="item-content">';
            khongcothongtin+='<div class="item-inner" align="center">';
            khongcothongtin+='    <div class="item-title" style="width: 100%">Chưa có thông tin lịch ghi điện</div>';
            khongcothongtin+='    </div>';
            khongcothongtin+='    </li>';

            var item = '<div class="list-block inset">'+
                '<ul>'+
                khongcothongtin +
                '</ul>'+
                '</div>';

            $$('.thongtin_lichGhiDien').append(item);
        }

    });
}

function hienThiChiSoDienTieuThu(thang,nam,ma_khang){
    var $$ = Dom7;
    $$('.thongtin_chiSoDienTieuThu').html("");
    ws_get_chiSoDienTieuThu(nam,thang,ma_khang,function(data){
       // console.log(data.data);
        if(data.code==1 || data.code=='1'){
            $$('.thongtin_chiSoDienTieuThu').html("");
            if(data.data!=null||data.data!=''){
                for(var i=0;i<data.data.length;i++){
                    var thongtin = '<li class="item-content">';
                    thongtin+='<div class="item-inner">';
                    thongtin+='    <div class="item-title">Thông tin :</div>';
                    thongtin+='<div class="item-after">'+data.data[i].KYTHANGNAM+'</div>';
                    thongtin+='    </div>';
                    thongtin+='    </li>';

                    var CHISODAUKY = '<li class="item-content">';
                    CHISODAUKY+='<div class="item-inner">';
                    CHISODAUKY+='    <div class="item-title">Chỉ số đầu kỳ :</div>';
                    CHISODAUKY+='<div class="item-after">'+data.data[i].CHISODAUKY+'</div>';
                    CHISODAUKY+='    </div>';
                    CHISODAUKY+='    </li>';

                    var CHISOCUOIKY = '<li class="item-content">';
                    CHISOCUOIKY+='<div class="item-inner">';
                    CHISOCUOIKY+='    <div class="item-title">Chỉ số cuối kỳ :</div>';
                    CHISOCUOIKY+='<div class="item-after">'+data.data[i].CHISOCUOIKY+'</div>';
                    CHISOCUOIKY+='    </div>';
                    CHISOCUOIKY+='    </li>';

                    var HESONHAN = '<li class="item-content">';
                    HESONHAN+='<div class="item-inner">';
                    HESONHAN+='    <div class="item-title">Hệ số nhân :</div>';
                    HESONHAN+='<div class="item-after">'+data.data[i].HESONHAN+'</div>';
                    HESONHAN+='    </div>';
                    HESONHAN+='    </li>';

                    var NGAYDAUKY = '<li class="item-content">';
                    NGAYDAUKY+='<div class="item-inner">';
                    NGAYDAUKY+='    <div class="item-title">Ngày đầu kỳ :</div>';
                    NGAYDAUKY+='<div class="item-after">'+data.data[i].NGAYDAUKY+'</div>';
                    NGAYDAUKY+='    </div>';
                    NGAYDAUKY+='    </li>';

                    var NGAYCUOIKY = '<li class="item-content">';
                    NGAYCUOIKY+='<div class="item-inner">';
                    NGAYCUOIKY+='    <div class="item-title">Ngày cuối kỳ :</div>';
                    NGAYCUOIKY+='<div class="item-after">'+data.data[i].NGAYCUOIKY+'</div>';
                    NGAYCUOIKY+='    </div>';
                    NGAYCUOIKY+='    </li>';

                    var NGAYNOPTIEN = '<li class="item-content">';
                    NGAYNOPTIEN+='<div class="item-inner">';
                    NGAYNOPTIEN+='    <div class="item-title">Ngày nộp tiền :</div>';
                    NGAYNOPTIEN+='<div class="item-after">'+data.data[i].NGAYNOPTIEN+'</div>';
                    NGAYNOPTIEN+='    </div>';
                    NGAYNOPTIEN+='    </li>';

                    var SANLUONG = '<li class="item-content">';
                    SANLUONG+='<div class="item-inner">';
                    SANLUONG+='    <div class="item-title">Điện tiêu thụ :</div>';
                    SANLUONG+='<div class="item-after">'+data.data[i].SANLUONG+'</div>';
                    SANLUONG+='    </div>';
                    SANLUONG+='    </li>';

                    var TONGTIEN = '<li class="item-content">';
                    TONGTIEN+='<div class="item-inner">';
                    TONGTIEN+='    <div class="item-title">Số tiền :</div>';
                    TONGTIEN+='<div class="item-after">'+data.data[i].TONGTIEN+' VNĐ</div>';
                    TONGTIEN+='    </div>';
                    TONGTIEN+='    </li>';

                    var TINHTRANGNO = '<li class="item-content">';
                    TINHTRANGNO+='<div class="item-inner">';
                    TINHTRANGNO+='    <div class="item-title">Tình trạng nợ :</div>';
                    TINHTRANGNO+='<div class="item-after">'+data.data[i].TINHTRANGNO+'</div>';
                    TINHTRANGNO+='    </div>';
                    TINHTRANGNO+='    </li>';

                    var item = '<div class="list-block inset">'+
                        '<ul>'+
                        thongtin+NGAYDAUKY+NGAYCUOIKY+CHISODAUKY+CHISOCUOIKY+HESONHAN+SANLUONG+TONGTIEN+NGAYNOPTIEN+TINHTRANGNO+
                        '</ul>'+
                        '</div>';

                    $$('.thongtin_chiSoDienTieuThu').append(item);

                }
            }
        }else{
            var khongcothongtin = '<li class="item-content">';
            khongcothongtin+='<div class="item-inner" align="center">';
            khongcothongtin+='    <div class="item-title" style="width: 100%">Chưa có thông tin điện tiêu thụ</div>';
            khongcothongtin+='    </div>';
            khongcothongtin+='    </li>';

            var item = '<div class="list-block inset">'+
                '<ul>'+
                khongcothongtin +
                '</ul>'+
                '</div>';

            $$('.thongtin_chiSoDienTieuThu').append(item);
        }

    });
}

function hienThiDiemThuTienDien(quanHuyen,tenDuong){
    var $$ = Dom7;
    $$('.thongtin_diemThuTienDien').html("");


    ws_get_DiemThuHo(quanHuyen,tenDuong,function(data){
        // console.log(data.data);
        if(data.code==1 || data.code=='1'){
            $$('.thongtin_diemThuTienDien').html("");
            if(data.data!=null||data.data!=''){
                for(var i=0;i<data.data.length;i++){
                    var thongtin = '<li class="item-content">';
                    thongtin+='<div class="item-inner">';
                    thongtin+='    <div class="item-title">'+data.data[i].ten_vi+'</div>';
                //    thongtin+='<div class="item-after">'+data.data[i].ten_vi+'</div>';
                    thongtin+='    </div>';
                    thongtin+='    </li>';

                    var diachi = '<li class="item-content">';
                    diachi+='<div class="item-inner">';
                    diachi+='    <div class="item-title">ĐC :'+data.data[i].diachi_vi+'</div>';
                //    diachi+='<div class="item-after">'+data.data[i].diachi_vi+'</div>';
                    diachi+='    </div>';
                    diachi+='    </li>';

                    var dienthoai = '<li class="item-content">';
                    dienthoai+='<div class="item-inner">';
                    dienthoai+='    <div class="item-title">Điện thoại :'+data.data[i].sdt_vi+'</div>';
                //    dienthoai+='<div class="item-after">'+data.data[i].sdt_vi+'</div>';
                    dienthoai+='    </div>';
                    dienthoai+='    </li>';

                    var giolamviec = '<li class="item-content">';
                    giolamviec+='<div class="item-inner">';
                    giolamviec+='    <div class="item-title">Giờ làm việc :'+data.data[i].giolamviec_vi+'</div>';
                //    giolamviec+='<div class="item-after">'+data.data[i].giolamviec_vi+'</div>';
                    giolamviec+='    </div>';
                    giolamviec+='    </li>';

                    var item = '<div class="list-block inset">'+
                        '<ul>'+
                        thongtin+diachi+dienthoai+giolamviec+
                        '</ul>'+
                        '</div>';

                    $$('.thongtin_diemThuTienDien').append(item);

                }
            }
        }else{
            var khongcothongtin = '<li class="item-content">';
            khongcothongtin+='<div class="item-inner" align="center">';
            khongcothongtin+='    <div class="item-title" style="width: 100%">Không tìm thấy điểm thu</div>';
            khongcothongtin+='    </div>';
            khongcothongtin+='    </li>';

            var item = '<div class="list-block inset">'+
                '<ul>'+
                khongcothongtin +
                '</ul>'+
                '</div>';

            $$('.thongtin_diemThuTienDien').append(item);
        }

    });
}

function hienThiTienDoXuLyYeuCau(ma_khang){
    var $$ = Dom7;
    $$('.thongtin_diemThuTienDien').html("");


    ws_get_TienDoXuLyYeuCau(ma_khang,function(data){
    //     console.log(data.data);
        if(data.code==1 || data.code=='1'){
            $$('.thongtin_tienDoXuLyYeuCau').html("");
            if(data.data!=null||data.data!=''){
                for(var i=0;i<data.data.length;i++){
                    var maYeuCau = '<li class="item-content">';
                    maYeuCau+='<div class="item-inner">';
                    maYeuCau+='    <div class="item-title">Mã yêu cầu : </div>';
                    maYeuCau+='<div class="item-after">'+data.data[i].MA_YCAU_KNAI+'</div>';
                    maYeuCau+='    </div>';
                    maYeuCau+='    </li>';

                    var ngayThucHien = '<li class="item-content">';
                    ngayThucHien+='<div class="item-inner">';
                    ngayThucHien+='    <div class="item-title">Ngày thực hiện : </div>';
                    ngayThucHien+='<div class="item-after">'+data.data[i].NGAY_THIEN+'</div>';
                    ngayThucHien+='    </div>';
                    ngayThucHien+='    </li>';

                    var noidung = '<li class="item-content">';
                    noidung+='<div class="item-inner">';
                    noidung+='    <div class="item-title">'+data.data[i].NOIDUNG+'</div>';
                    //noidung+='<div class="item-after">'+data.data[i].sdt_vi+'</div>';
                    noidung+='    </div>';
                    noidung+='    </li>';

                    var item = '<div class="list-block inset">'+
                        '<ul>'+
                        maYeuCau+ngayThucHien+noidung+
                        '</ul>'+
                        '</div>';

                    $$('.thongtin_tienDoXuLyYeuCau').append(item);

                }
            }
        }else{
            var khongcothongtin = '<li class="item-content">';
            khongcothongtin+='<div class="item-inner" align="center">';
            khongcothongtin+='    <div class="item-title" style="width: 100%">Không tìm thấy thông tin </div>';
            khongcothongtin+='    </div>';
            khongcothongtin+='    </li>';

            var item = '<div class="list-block inset">'+
                '<ul>'+
                khongcothongtin +
                '</ul>'+
                '</div>';

            $$('.thongtin_tienDoXuLyYeuCau').append(item);
        }

    });
}

function hienThiHuongDanDangKyDichVuDien(idLoaiDichVu){
    ws_get_HuongDanDangKyDichVuDien(idLoaiDichVu,function(data){
        if(data.code == 1 || data.code == '1'){
            $$('.noiDungHuongDan').html(data.data);
            $$('.noiDungHuongDan').parent().parent().parent().parent().css('display','inherit');
            if(data.data == ''){
                $$('.noiDungHuongDan').html("");
                $$('.noiDungHuongDan').parent().parent().parent().parent().css('display','none');
            }
        }else{
            $$('.noiDungHuongDan').html("");
            $$('.noiDungHuongDan').parent().parent().parent().parent().css('display','none');
        }
    });
}

function hienThiTrangThaiDangKyNhanHDDT(){
    console.log('Hiển thị trạng thái đăng ký nhận HDDT');
    ws_check_dangKyNhanHDDT_quaEmail(thongtinKH[localStorage.getItem('thongtinKH_active')].MA_KHANG,function(data){
        //    console.log(data);
        if(data.code==1||data.code== '1'){
            $$('#thongbao_trangthai_dangkyNhanEmailHDDT').html('Mã khách hàng này đã đăng ký nhận email hóa đơn điện tử. Để thay đổi vui lòng nhập lại email ở khung bên dưới !');
            $$('.page-dichvu-nhanEmailHDDT .input_email').val(data.data.EMAIL);
            trangthai_dangkyNhanHDDT = 'capnhat';
            email_daDangKy = data.data.EMAIL;
        }else if (data.code==0||data.code== '0'){
            $$('#thongbao_trangthai_dangkyNhanEmailHDDT').html('Mã khách hàng này chưa đăng ký nhận email hóa đơn điện tử. Để đăng ký vui lòng nhập email ở khung bên dưới !');
            $$('.page-dichvu-nhanEmailHDDT .input_email').val('');
            trangthai_dangkyNhanHDDT = 'dangky';
            email_daDangKy = "";
        }else{
            $$('#thongbao_trangthai_dangkyNhanEmailHDDT').html("");
            $$('.page-dichvu-nhanEmailHDDT .input_email').val('');
            trangthai_dangkyNhanHDDT = 'dangky';
            email_daDangKy = "";
        }
    });
}


function click_guiyeucau_capmoi(){
    var myApp = new Framework7();
    console.log('click guiyeucau_capmoi');

    var list_giaytohienco = document.getElementsByClassName('input_giaytohienco');
    var str_giaytohienco = "";
    if(list_giaytohienco.length>0){
        for(var i=0;i<list_giaytohienco.length;i++){
            if(list_giaytohienco[i].checked==true){
                str_giaytohienco +=list_giaytohienco[i].value+"</br>";
            }
        }
    }

    var input_dienthoailienhe = $$('.page-dichvu-dangkymuadien #input_dienthoailienhe').val();
    var input_email = $$('.page-dichvu-dangkymuadien #input_email').val();
    var input_sopha = $$('.page-dichvu-dangkymuadien #input_sopha').val();
    var input_mucdichsudung = $$('.page-dichvu-dangkymuadien #input_mucdichsudung').val();
    var input_noidungyeucau = $$('.page-dichvu-dangkymuadien #input_noidungyeucau').val();

    input_dienthoailienhe = input_dienthoailienhe.trim();
    input_email = input_email.trim();
    input_sopha = input_sopha.trim();
    input_mucdichsudung = input_mucdichsudung.trim();
    input_noidungyeucau = input_noidungyeucau.trim();
    if(input_dienthoailienhe==""){
        myApp.modal({
            title:  appConfigs.thongBaoSoDienThoaiNULL_tieuDe,
            text: appConfigs.thongBaoSoDienThoaiNULL_noiDung,
            buttons: [
                {
                    text: appConfigs.thongBaoSoDienThoaiNULL_button,
                }
            ]
        });
        return;
    }

    if(input_email==""){
        myApp.modal({
            title:  appConfigs.thongBaoEmailNULL_tieuDe,
            text: appConfigs.thongBaoEmailNULL_noiDung,
            buttons: [
                {
                    text: appConfigs.thongBaoEmailNULL_button,
                }
            ]
        });
        return;
    }

    if(input_noidungyeucau==""){
        myApp.modal({
            title:  appConfigs.thongBaoNoiDungNULL_tieuDe,
            text: appConfigs.thongBaoNoiDungNULL_noiDung,
            buttons: [
                {
                    text: appConfigs.thongBaoNoiDungNULL_button,
                }
            ]
        });
        return;
    }

    var KH_acvive = localStorage.getItem('thongtinKH_active');
    ws_submit_dangKyMuaDien(thongtinKH[KH_acvive].MA_KHANG,input_dienthoailienhe,input_email,input_sopha,input_mucdichsudung,input_noidungyeucau,str_giaytohienco,function(){
        if(data.code == 1 || data.code == '1'){
            myApp.modal({
                title:  appConfigs.thongBaoGuiYeuCauThanhCong_tieuDe,
                text: appConfigs.thongBaoGuiYeuCauThanhCong_noiDung,
                buttons: [
                    {
                        text: appConfigs.thongBaoGuiYeuCauThanhCong_button,
                        onClick: function() {
                            $$('#input_dienthoailienhe').val("");
                            $$('#input_email').val('');
                            $$('#input_noidungyeucau').val("");
                        }
                    }
                ]
            });
        }
    });

}

function click_guiyeucau(){
    var myApp = new Framework7();
    console.log('click guiyeucau tong hop');

    var input_dienthoailienhe = $$('.page-dichvu-guiYeuCau #input_dienthoailienhe').val();
    var input_loaiyeucau = $$('.page-dichvu-guiYeuCau #input_loaiyeucau').val();
    var input_noidungyeucau = $$('.page-dichvu-guiYeuCau #input_noidungyeucau').val();

    input_dienthoailienhe = input_dienthoailienhe.trim();
    input_loaiyeucau = input_loaiyeucau.trim();
    input_noidungyeucau = input_noidungyeucau.trim();
    if(input_dienthoailienhe==""){
        myApp.modal({
            title:  appConfigs.thongBaoSoDienThoaiNULL_tieuDe,
            text: appConfigs.thongBaoSoDienThoaiNULL_noiDung,
            buttons: [
                {
                    text: appConfigs.thongBaoSoDienThoaiNULL_button,
                }
            ]
        });
        return;
    }

    if(input_noidungyeucau==""){
        myApp.modal({
            title:  appConfigs.thongBaoNoiDungNULL_tieuDe,
            text: appConfigs.thongBaoNoiDungNULL_noiDung,
            buttons: [
                {
                    text: appConfigs.thongBaoNoiDungNULL_button,
                }
            ]
        });
        return;
    }

    var KH_acvive = localStorage.getItem('thongtinKH_active');
    ws_submit_dangKyDichVuDien(thongtinKH[KH_acvive].MA_KHANG,thongtinKH[KH_acvive].TEN_KHANG,thongtinKH[KH_acvive].DIA_CHI,input_dienthoailienhe,input_loaiyeucau,input_noidungyeucau,function(data){
        if(data.code == 1 || data.code == '1'){
            myApp.modal({
                title:  appConfigs.thongBaoGuiYeuCauThanhCong_tieuDe,
                text: appConfigs.thongBaoGuiYeuCauThanhCong_noiDung,
                buttons: [
                    {
                        text: appConfigs.thongBaoGuiYeuCauThanhCong_button,
                        onClick: function() {
                            $$('.page-dichvu-guiYeuCau #input_dienthoailienhe').val("");
                            $$('.page-dichvu-guiYeuCau #input_noidungyeucau').val("");
                        }
                    }
                ]
            });
        }

    });

}

function click_guiYeuCauDangKyNhanHDDTquaEmail(){
    var myApp = new Framework7();
    var input_email = $$('.page-dichvu-nhanEmailHDDT #input_email').val();
    input_email = input_email.trim();
    //  console.log("1");
    if(input_email==""){
        //    console.log("1.5");
        myApp.modal({
            title:  appConfigs.thongBaoEmailNULL_tieuDe,
            text: appConfigs.thongBaoEmailNULL_noiDung,
            buttons: [
                {
                    text: appConfigs.thongBaoEmailNULL_button,
                }
            ]
        });
        return;
    }else if(input_email == email_daDangKy){
        //    console.log("2");
        myApp.modal({
            title:  appConfigs.thongBaoEmailMoiPhaiKhacEmailCu_tieuDe,
            text: appConfigs.thongBaoEmailMoiPhaiKhacEmailCu_noiDung,
            buttons: [
                {
                    text: appConfigs.thongBaoEmailMoiPhaiKhacEmailCu_button,
                }
            ]
        });
        return;
    }else{
        //    console.log("3");
        var KH_acvive = localStorage.getItem('thongtinKH_active');
        ws_submit_dangKyNhanHDDT_quaEmail(thongtinKH[KH_acvive].MA_KHANG,input_email,trangthai_dangkyNhanHDDT,function(data){

            if(data.code == 1 || data.code == '1'){
                myApp.modal({
                    title:  appConfigs.thongBaoDangKyThanhCong_tieuDe,
                    text: appConfigs.thongBaoDangKyThanhCong_noiDung,
                    buttons: [
                        {
                            text: appConfigs.thongBaoDangKyThanhCong_button,
                            onClick: function() {
                                hienThiTrangThaiDangKyNhanHDDT();
                            }
                        }
                    ]
                });
            }else if(data.code == -3 || data.code =='-3'){
                myApp.modal({
                    title:  appConfigs.thongBaoSaiEmail_tieuDe,
                    text: appConfigs.thongBaoSaiEmail_noiDung,
                    buttons: [
                        {
                            text: appConfigs.thongBaoSaiEmail_button,
                        }
                    ]
                });
                return;
            }
        });

    }

}


function click_luuThemTaiKhoan(){
    var myApp = new Framework7();
    var sodienthoai = $$('.page-them-themtaikhoan #sodienthoai').val();
    var makhachhang = $$('.page-them-themtaikhoan #makhachhang').val();
    sodienthoai = sodienthoai.trim();
    makhachhang = makhachhang.trim();
    makhachhang = makhachhang.toUpperCase();
    if(sodienthoai==''){
        myApp.modal({
            title:  appConfigs.thongBaoSoDienThoaiNULL_tieuDe,
            text: appConfigs.thongBaoSoDienThoaiNULL_noiDung,
            buttons: [
                {
                    text: appConfigs.thongBaoSoDienThoaiNULL_button,
                    onClick: function() {
                    }
                }
            ]
        });
        return;
    }

    if(makhachhang == ''){
        myApp.modal({
            title:  appConfigs.thongBaoMaKH_NULL_tieuDe,
            text: appConfigs.thongBaoMaKH_NULL_noiDung,
            buttons: [
                {
                    text: appConfigs.thongBaoMaKH_NULL_button,
                    onClick: function() {
                    }
                }
            ]
        });
        return;
    }

    for(var k=0;k<window.thongtinKH.length;k++){
        if(window.thongtinKH[k].MA_KHANG == makhachhang ){
            myApp.modal({
                title:  appConfigs.thongBaoMaKH_DaSuDung_tieuDe,
                text: appConfigs.thongBaoMaKH_DaSuDung_noiDung,
                buttons: [
                    {
                        text: appConfigs.thongBaoMaKH_DaSuDung_button,
                        onClick: function() {
                        }
                    }
                ]
            });
            return;
        }
    }

    // kiem tra va kich hoat tai khoan
    ws_get_ws_checkCustomerID(makhachhang,function(data){
        if(data.code == "1" || data.code == 1) {
            // ma khach hang hop le
            // luu thong tin khach hang len server
            ws_get_kichHoatTaiKhoan(makhachhang,sodienthoai,function(data){
                switch(data.code){
                    case '1': case 1:
                    window.thongtinMaKH_json[window.thongtinMaKH_json.length] = makhachhang;
                    localStorage.setItem('thongtinMaKH_json',JSON.stringify(window.thongtinMaKH_json));

                    ws_get_ManyCustomerInfo(localStorage.getItem('thongtinMaKH_json'),function(data){
                        console.log(data);
                        window.thongtinKH = data.data;
                        localStorage.setItem('thongtinKH',JSON.stringify(window.thongtinKH));

                        myApp.modal({
                            title:  appConfigs.thongBaoThemKH_ThanhCong_tieuDe,
                            text: appConfigs.thongBaoThemKH_ThanhCong_noiDung,
                            buttons: [
                                {
                                    text: appConfigs.thongBaoThemKH_ThanhCong_button,
                                    onClick: function() {
                                        hienThiDanhSachTaiKhoan();
                                    }
                                }
                            ]
                        });
                    });

                    break;
                    case '-4':
                        myApp.modal({
                            title:  appConfigs.thongBaoSaiSoDienThoai_tieuDe,
                            text: appConfigs.thongBaoSaiSoDienThoai_noiDung,
                            buttons: [
                                {
                                    text: appConfigs.thongBaoSaiSoDienThoai_button,
                                    onClick: function() {
                                    }
                                }
                            ]
                        });
                        return;
                        break;
                }
            });

        }else{
            // ---------------- Thong bao loi ma khach hang ------------
            myApp.modal({
                title:  appConfigs.thongBaoSaiMaKH_tieuDe,
                text: appConfigs.thongBaoSaiMaKH_noiDung,
                buttons: [
                    {
                        text: appConfigs.thongBaoSaiMaKH_button,
                        onClick: function() {
                        }
                    }
                ]
            });
            return;
            // --------------- Thong bao loi ma khach hang -------------
        }

    });
}

function load_page_tracuu_lichghidien(){
    var myApp = new Framework7();
    hienThiTaiKhoanDangChon();
    var d = new Date();
    var array_thang =  ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    var array_nam = ['năm '+(d.getFullYear()-1),'năm '+d.getFullYear(),'năm '+(d.getFullYear()+1)];
    var thang = d.getMonth()+1;
    var nam = d.getFullYear();

    var pickerThangNam = myApp.picker({
        input: '#picker-thangNam',
        rotateEffect: true,
        value:[array_thang[d.getMonth()],'năm '+d.getFullYear()],
        cols: [
            {
                textAlign: 'left',
                values: array_thang,
                displayValues: array_thang
            },
            {
                textAlign: 'right',
                values: array_nam,
                displayValues: array_nam
            }
        ],
        onClose : function (p){
            console.log(p)
            thang = p.value[0].replace('Tháng ',"");
            nam = p.value[1].replace('năm ',"");
            console.log(thang);
            console.log(nam);
            hienThiLichGhiDien(thang,nam,thongtinKH[localStorage.getItem('thongtinKH_active')].MA_KHANG);
        }
    });

    hienThiLichGhiDien(thang,nam,thongtinKH[localStorage.getItem('thongtinKH_active')].MA_KHANG);
}

function load_page_tracuu_chisodientieuthu(){
    var myApp = new Framework7();
    hienThiTaiKhoanDangChon();
    var d = new Date();
    var array_thang =  ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    var array_nam = ['năm '+(d.getFullYear()-1),'năm '+d.getFullYear(),'năm '+(d.getFullYear()+1)];
    var thang = d.getMonth()+1;
    var nam = d.getFullYear();

    var pickerThangNam = myApp.picker({
        input: '#picker-thangNam',
        rotateEffect: true,
        value:[array_thang[d.getMonth()],'năm '+d.getFullYear()],
        cols: [
            {
                textAlign: 'left',
                values: array_thang,
                displayValues: array_thang
            },
            {
                textAlign: 'right',
                values: array_nam,
                displayValues: array_nam
            }
        ],
        onClose : function (p){
            console.log(p)
            thang = p.value[0].replace('Tháng ',"");
            nam = p.value[1].replace('năm ',"");
            console.log(thang);
            console.log(nam);
            hienThiChiSoDienTieuThu(thang,nam,thongtinKH[localStorage.getItem('thongtinKH_active')].MA_KHANG);
        }
    });

    hienThiChiSoDienTieuThu(thang,nam,thongtinKH[localStorage.getItem('thongtinKH_active')].MA_KHANG);
}

function load_page_tracuu_tienDoXuLyYeuCau(){
    var myApp = new Framework7();
    hienThiTaiKhoanDangChon();
    hienThiTienDoXuLyYeuCau(thongtinKH[localStorage.getItem('thongtinKH_active')].MA_KHANG);
}

function load_page_tracuu_hoadondientu(){
    var myApp = new Framework7();
    hienThiTaiKhoanDangChon();
    ws_get_linkHDDT(thongtinKH[localStorage.getItem('thongtinKH_active')].MA_KHANG,function(data){
        if(data.code==1||data.code== '1'){
            $$('.thongtin_hoaDonDienTu').html('<iframe src="'+data.data+'" width="100%" height="100%"></iframe>');

        }
    });
}

function load_page_tracuu_bieudophutai(){
    var myApp = new Framework7();
    hienThiTaiKhoanDangChon();
    var maKhachHang = thongtinKH[localStorage.getItem('thongtinKH_active')].MA_KHANG;
    var today = new Date();
    var tungay = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    var denngay = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();

    var myCalendarTuNgay = myApp.calendar({
        input: '#picker-tungay',
        dateFormat: 'dd-mm-yyyy',
        onDayClick: function (p, dayContainer, year, month, day){
            tungay = day+'-'+(month+1)+'-'+year;
            ws_get_linkBieuDoPhuTai(maKhachHang,tungay,denngay,function(data){
                $$('.thongtin_bieudophutai').html('<iframe src="'+data+'" width="100%" height="100%"></iframe>');
            });
            myCalendarTuNgay.close();
        },
        value: [new Date()],
    });

    var myCalendarDenNgay = myApp.calendar({
        input: '#picker-denngay',
        dateFormat: 'dd-mm-yyyy',
        onDayClick: function (p, dayContainer, year, month, day){
            denngay = day+'-'+(month+1)+'-'+year;
            ws_get_linkBieuDoPhuTai(maKhachHang,tungay,denngay,function(data){
                $$('.thongtin_bieudophutai').html('<iframe src="'+data+'" width="100%" height="100%"></iframe>');
            });
            myCalendarDenNgay.close();
        },
        value: [new Date()],
    });

    ws_get_linkBieuDoPhuTai(maKhachHang,tungay,denngay,function(data){
        $$('.thongtin_bieudophutai').html('<iframe src="'+data+'" width="100%" height="100%"></iframe>');
    });
}

function load_page_tracuu_thongsovanhanh(){
    var myApp = new Framework7();
    hienThiTaiKhoanDangChon();
    var maKhachHang = thongtinKH[localStorage.getItem('thongtinKH_active')].MA_KHANG;
    var today = new Date();
    var ngay = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();


    var myCalendarNgay = myApp.calendar({
        input: '#picker-ngay',
        dateFormat: 'dd-mm-yyyy',
        onDayClick: function (p, dayContainer, year, month, day){
            ngay = day+'-'+(month+1)+'-'+year;
            ws_get_linkThongSoVanHanh(maKhachHang,ngay,function(data){
                $$('.thongtin_thongsovanhanh').html('<iframe src="'+data+'" width="100%" height="100%"></iframe>');
            });
            myCalendarNgay.close();
        },
        value: [new Date()],
    });

    ws_get_linkThongSoVanHanh(maKhachHang,ngay,function(data){
        $$('.thongtin_thongsovanhanh').html('<iframe src="'+data+'" width="100%" height="100%"></iframe>');
    });
}

function load_page_tracuu_diemthutiendien(){
    var myApp = new Framework7();
    var $$ = Dom7;
    //hienThiTaiKhoanDangChon();
    var quanHuyen='';
    var tenDuong='';
    var array_quyenHuyen= [];
    ws_get_quanHuyenDiemThuHo(function(data){
        if(data.code==1||data.code== '1'){
            for(var i = 0;i<data.data.length;i++){
                array_quyenHuyen[array_quyenHuyen.length]=data.data[i].quan_vi;
            }
            // dat gia tri quan huyen mac dinh
            quanHuyen = array_quyenHuyen[0];

            var pickerQuanHuyen = myApp.picker({
                input: '#picker-quanHuyen',
                rotateEffect: true,
                value:[quanHuyen],
                cols: [
                    {
                        textAlign: 'center',
                        values: array_quyenHuyen,
                        displayValues: array_quyenHuyen
                    }
                ],
                onClose : function (p){
                    //     console.log(p.cols[0].activeIndex);
                    //    console.log(p);
                    tenDuong = $$('#input_tenDuong').val();
                    quanHuyen = $$('#picker-quanHuyen').val();
                    hienThiDiemThuTienDien(quanHuyen,tenDuong);
                }
            });

            hienThiDiemThuTienDien(quanHuyen,tenDuong);
        }
    });

    $$('#input_tenDuong').on('change',function(){
        tenDuong = $$('#input_tenDuong').val();
        quanHuyen = $$('#picker-quanHuyen').val();
        hienThiDiemThuTienDien(quanHuyen,tenDuong);
    });
}


function load_page_dichvu_dangkymuadien(){
    hienThiTaiKhoanDangChon();
}

function load_page_dichvu_guiYeuCau(page){

    hienThiTaiKhoanDangChon();
    $$('.page-dichvu-guiYeuCau #input_loaiyeucau').html("");

    switch(page.query.nhom){
        case 'thongtinhopdong':
            $$('#tieude-page-dichvu-guiYeuCau').html('Hợp đồng');
            break;
        case 'thongtindienke':
            $$('#tieude-page-dichvu-guiYeuCau').html('Điện kế');
            break;
        case 'thongtingiaban':
            $$('#tieude-page-dichvu-guiYeuCau').html('Giá bán');
            break;
        case 'thongtinhoadon':
            $$('#tieude-page-dichvu-guiYeuCau').html('Báo chỉ số điện kế');
            break;
        case 'thongtinkhac':
            $$('#tieude-page-dichvu-guiYeuCau').html('Yêu cầu khác');
            break;
        default:
            $$('#tieude-page-dichvu-guiYeuCau').html('Yêu cầu khác');
            break;
    }

    ws_get_LoaiYeuCauDangKyDichVuDien(page.query.nhom,function(data){
        if(data.code == 1 || data.code == '1'){
            for(var i=0;i<data.data.length;i++){
                $$('.page-dichvu-guiYeuCau #input_loaiyeucau').append('<option value="'+data.data[i].ID+'">'+data.data[i].NOIDUNG+'</option>');
            }

            if(data.data.length > 0){
                $$('.page-dichvu-guiYeuCau .form_input #name_select_loaiyeucau').html(data.data[0].NOIDUNG);
                hienThiHuongDanDangKyDichVuDien(data.data[0].ID);
            }
        }

    });

    $$('#input_loaiyeucau').on('change',function(){
        hienThiHuongDanDangKyDichVuDien(this.value);
    });
}

function load_page_dichvu_thanhtoantructuyen(){
    hienThiTaiKhoanDangChon();

    ws_get_linkthanhToanTrucTuyen(function(data){
        if(data.code==1||data.code== '1'){
            var url = data.data+"/?cusid="+thongtinKH[localStorage.getItem('thongtinKH_active')].MA_KHANG+"&mobile=&email=";
            $$('.thongtin_thanhToanTrucTuyen').html('<iframe src="'+url+'" width="100%" height="100%"></iframe>');

        }
    });
}

function load_page_dichvu_nhanEmailHDDT(){
    hienThiTaiKhoanDangChon();
    hienThiTrangThaiDangKyNhanHDDT();
}*/
