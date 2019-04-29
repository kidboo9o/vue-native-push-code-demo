/**
 * Created by Administrator on 3/31/2017.
 */
function MyDatabase() {
    // showlog("Create MyDatabase");
    this.openDatabase = function(){
        try {
            // var db = window.sqlitePlugin.openDatabase({name: 'test.db', location: 2},function(){
            //     showlog("Open database success");
            // },function(){
            //     showlog("Open database error");
            // });
            // var db = window.openDatabase("demo", "1.0", "tutorial database", 1000000);
            //
            // db.transaction(function(tx){
            //     tx.executeSql('CREATE TABLE IF NOT EXISTS DemoTable (name, score)');
            //     tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['Alice', 101]);
            //     tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['Betty', 202]);
            // },function(err) {
            //     showlog("Error processing SQL: "+err.code);
            // },function() {
            //     showlog("success!");
            //     db.transaction(function(tx){
            //         tx.executeSql("select * from DemoTable ",[],function(tx,result){
            //             var len = result.rows.length;
            //             showlog("len= "+len);
            //             for (var i=0; i<len; i++){
            //                 var note = result.rows.item(i);
            //                 showlog(note);
            //             }
            //         },function(err){
            //
            //         });
            //     },function(err){
            //
            //     },function() {
            //         showlog("select success!");
            //     });
            // });
            /*  ############################################# */
            // showlog("Opened database");
            var db = window.openDatabase("demo", "1.0", "tutorial database", 1000000);
            db.transaction(function(tr) {
                // showlog("Opened transaction");

                tr.executeSql('CREATE TABLE IF NOT EXISTS taikhoan_chitiet (' +
                    'id INTEGER PRIMARY KEY,'+
                    'username VARCHAR(255),'+
                    'ma_canho VARCHAR(100),'+
                    'id_duan INTEGER,'+
                    'ten_duan VARCHAR(250),'+
                    'diachi_duan VARCHAR(500),' +
                    'tang VARCHAR(100),' +
                    'ten_khang VARCHAR(500),' +
                    'loai_canho VARCHAR(50),' +
                    'ten_loaicanho VARCHAR(200),'+
                    'trangthai VARCHAR(20),'+
                    'ngay_sua INTEGER'+
                    ')', [], function(tr, rs) {
                    // showlog("Create table taikhoan_chitiet conplete");
                });

                tr.executeSql('CREATE TABLE IF NOT EXISTS thongbao (' +
                    'id INTEGER PRIMARY KEY,'+
                    'username VARCHAR(255),'+
                    'id_taikhoan_chitiet INTEGER,'+
                    'loaithongbao INTEGER,'+
                    'noidung VARCHAR(1000),'+
                    'ngay_tao INTEGER,' +
                    'ngay_xem INTEGER,' +
                    'ngay_xoa INTEGER,' +
                    'ngay_cnhat INTEGER,' +
                    'trangthai VARCHAR(45),'+
                    'dongbo INTEGER' +
                    ')', [], function(tr, rs) {
                    // showlog("Create table thongbao conplete");
                });

                tr.executeSql('CREATE TABLE IF NOT EXISTS cskh_loaidichvu (' +
                    'ma VARCHAR(100) PRIMARY KEY,'+
                    'mota VARCHAR(255),'+
                    'stt INTEGER'+
                    ')', [], function(tr, rs) {
                    // showlog("Create table cskh_loaidichvu conplete");
                });

                tr.executeSql('CREATE TABLE IF NOT EXISTS cskh_danhmuc_dichvu (' +
                    'ma VARCHAR(100) PRIMARY KEY,'+
                    'mota VARCHAR(255),'+
                    'ma_cha VARCHAR(100),'+
                    'nhom VARCHAR(100)'+
                    ')', [], function(tr, rs) {
                    // showlog("Create table cskh_danhmuc_dichvu conplete");
                });

                tr.executeSql('CREATE TABLE IF NOT EXISTS cskh_danhmuc_dichvu_chitiet (' +
                    'id VARCHAR(100) PRIMARY KEY,'+
                    'id_dichvu VARCHAR(255),'+
                    'id_nhomcanho VARCHAR(100)'+
                    ')', [], function(tr, rs) {
                    // showlog("Create table cskh_danhmuc_dichvu conplete");
                });

            }, function(err) {
                showlog('Open database ERROR: ' + JSON.stringify(err));
            });

        }catch(e) {
            showlog("Not load SQLite");
        }
    };

    // DELETE
    this.delete_taisan = function(id,callback){
        try {
            var db = window.openDatabase("demo", "1.0", "tutorial database", 1000000);
            db.transaction(function(tr) {
            //    showlog("Opened transaction");
                tr.executeSql("DELETE FROM taikhoan_chitiet WHERE id='"+id+"' ", [], function(tr, rs) {
                    callback();
                });

            }, function(err) {
                showlog('Open database ERROR: ' + JSON.stringify(err));
            });
        }
        catch (e){
            showlog("Not load SQLite");
            callback();
        }

    }

    // xoa tat ca tai san
    this.delete_taisan_all = function(callback){
        try {
            var db = window.openDatabase("demo", "1.0", "tutorial database", 1000000);
            db.transaction(function(tr) {
            //    showlog("Opened transaction");
                tr.executeSql("DELETE FROM taikhoan_chitiet ", [], function(tr, rs) {
                    callback();
                });

            }, function(err) {
                showlog('Open database ERROR: ' + JSON.stringify(err));
            });
        }
        catch (e){
            showlog("Not load SQLite");
            callback();
        }
    }

    this.delete_thongbao_all = function(callback){
        try {
            var db = window.openDatabase("demo", "1.0", "tutorial database", 1000000);
            db.transaction(function(tr) {
            //    showlog("Opened transaction");
                tr.executeSql("DELETE FROM thongbao ", [], function(tr, rs) {
                    callback();
                });

            }, function(err) {
                showlog('Open database ERROR: ' + JSON.stringify(err));
            });

        }
        catch (e){
            showlog("Not load SQLite");
            callback();
        }
    }

    this.delete_list_thongbao = function(list_id,callback){
        try {
            var db = window.openDatabase("demo", "1.0", "tutorial database", 1000000);
            db.transaction(function(tr) {
                if(list_id.length>0){
                    var sql_id = "";
                    for(var i=0;i<list_id.length;i++){
                        var mess = list_id[i];
                        if(i==0){
                            sql_id +="'"+mess['id']+"'";
                        }else{
                            sql_id +=",'"+mess['id']+"'";
                        }
                    }
                    tr.executeSql("DELETE FROM thongbao where id in ("+ sql_id +")", [], function(tr, rs) {
                        callback();
                    });

                }else{
                    callback();
                }
            }, function(err) {
                showlog('Open database ERROR: ' + JSON.stringify(err));
            });

        }
        catch (e){
            showlog("Not load SQLite");
            callback();
        }
    }

    this.delete_all_cskh_danhmuc_dichvu = function(callback){
        try {
            var db = window.openDatabase("demo", "1.0", "tutorial database", 1000000);
            db.transaction(function(tr) {
                tr.executeSql("DELETE FROM cskh_danhmuc_dichvu ", [], function(tr, rs) {
                    callback();
                });
            }, function(err) {
                showlog('Open database ERROR: ' + JSON.stringify(err));
            });
        }
        catch (e){
            showlog("Not load SQLite");
            callback();
        }
    }

    this.delete_all_cskh_danhmuc_dichvu_chitiet = function(callback){
        try {
            var db = window.openDatabase("demo", "1.0", "tutorial database", 1000000);
            db.transaction(function(tr) {
                tr.executeSql("DELETE FROM cskh_danhmuc_dichvu_chitiet ", [], function(tr, rs) {
                    callback();
                });
            }, function(err) {
                showlog('Open database ERROR: ' + JSON.stringify(err));
            });
        }
        catch (e){
            showlog("Not load SQLite");
            callback();
        }
    }

    this.delete_all_loaidichvu = function(callback){
        try {
            var db = window.openDatabase("demo", "1.0", "tutorial database", 1000000);
            db.transaction(function(tr) {
                tr.executeSql("DELETE FROM cskh_loaidichvu ", [], function(tr, rs) {
                    callback();
                });
            }, function(err) {
                showlog('Open database ERROR: ' + JSON.stringify(err));
            });
        }
        catch (e){
            showlog("Not load SQLite");
            callback();
        }
    }



    // INSERT
    this.insert_list_taisan = function(data,callback){
        try {
            // showlog("Insert taikhoan_chitiet");
            var db = window.openDatabase("demo", "1.0", "tutorial database", 1000000);
            db.transaction(function(tr) {
                var ds_taisan = data;
                if(ds_taisan.length > 0 ){
                    for(var i=0;i < ds_taisan.length;i++){
                        var taisan = ds_taisan[i];
                        var sql= "INSERT INTO taikhoan_chitiet (" +
                            "id,"+
                            "username,"+
                            "ma_canho,"+
                            "id_duan,"+
                            "ten_duan,"+
                            "diachi_duan,"+
                            "tang,"+
                            "ten_khang,"+
                            "loai_canho,"+
                            "ten_loaicanho,"+
                            "trangthai,"+
                            "ngay_sua"+
                            ") VALUES (" +
                            "'"+taisan['id']+"'," +
                            "'"+taisan['username']+"'," +
                            "'"+taisan['ma_canho']+"'," +
                            "'"+taisan['id_duan']+"'," +
                            "'"+taisan['ten_duan']+"'," +
                            "'"+taisan['diachi_duan']+"'," +
                            "'"+taisan['tang']+"'," +
                            "'"+taisan['ten_khang']+"'," +
                            "'"+taisan['loai_canho']+"'," +
                            "'"+taisan['ten_loaicanho']+"'," +
                            "'"+taisan['trangthai']+"'," +
                            "strftime('%s','"+taisan['ngay_sua']+"')" +
                            ") ";

                        tr.executeSql(sql, [], function(tr, rs) {
                            // showlog("Insert taikhoan_chitiet complete ");
                        });
                    }
                }
            }, function(err) {
                showlog('Open database ERROR: ' + JSON.stringify(err));
            },function(){
                callback();
            });

        }
        catch (e){
            showlog("Not load SQLite");
            callback();
        }

    };

    this.insert_list_thongbao = function(data,callback){
        try {
            var db = window.openDatabase("demo", "1.0", "tutorial database", 1000000);
            db.transaction(function(tr) {
                var ds_thongbao = data;
                if(ds_thongbao.length > 0 ){
                    for(var i=0;i < ds_thongbao.length;i++){
                        var thongbao = ds_thongbao[i];
                        var ngaytao = 0;
                        var ngayxem = 0;
                        var ngayxoa = 0;
                        var ngay_cnhat = 0;
                        if(thongbao['ngay_tao'] == null || thongbao['ngay_tao'] == 'null'){
                            ngaytao = 0;
                        }else{
                            ngaytao = " strftime('%s','"+thongbao['ngay_tao']+"') ";
                        }

                        if(thongbao['ngay_xem'] == null || thongbao['ngay_xem'] == "null"){
                            ngayxem = 0;
                        }else{
                            ngayxem = " strftime('%s','"+thongbao['ngay_xem']+"') ";
                        }

                        if(thongbao['ngay_xoa'] == null || thongbao['ngay_xoa'] == 'null'){
                            ngayxoa = 0;
                        }else{
                            ngayxoa = " strftime('%s','"+thongbao['ngay_xoa']+"') ";
                        }

                        if(thongbao['ngay_cnhat'] == null || thongbao['ngay_cnhat'] == 'null'){
                            ngay_cnhat = 0;
                        }else{
                            ngay_cnhat = " strftime('%s','"+thongbao['ngay_cnhat']+"') ";
                        }

                        var sql= "INSERT INTO thongbao (" +
                            "id,"+
                            "username,"+
                            "id_taikhoan_chitiet,"+
                            "loaithongbao,"+
                            "noidung,"+
                            "ngay_tao,"+
                            "ngay_xem,"+
                            "ngay_xoa,"+
                            "ngay_cnhat,"+
                            "trangthai,"+
                            "dongbo"+
                            ") VALUES (" +
                            "'"+thongbao['id']+"'," +
                            "'"+thongbao['username']+"'," +
                            "'"+thongbao['id_taikhoan_chitiet']+"'," +
                            "'"+thongbao['loaithongbao']+"'," +
                            "'"+thongbao['noidung']+"'," +
                            ngaytao+ "," +
                            ngayxem+ "," +
                            ngayxoa+ "," +
                            ngay_cnhat+ "," +
                            "'"+thongbao['trangthai']+"', " +
                            "'0'" +
                            ")";

                        tr.executeSql(sql, [], function(tr, rs) {});
                    }
                }
            }, function(err) {
                showlog('Open database ERROR: ' + JSON.stringify(err));
            },function(){
                callback();
            });
        }
        catch (e){
            showlog("Not load SQLite");
            callback();
        }

    };

    this.insert_list_loaidichvu = function(data,callback){
        try {
            var db = window.openDatabase("demo", "1.0", "tutorial database", 1000000);
            db.transaction(function(tr) {
                var ds_loaidichvu = data;
                if(ds_loaidichvu.length > 0 ){
                    for(var i=0;i < ds_loaidichvu.length;i++){
                        var loaidichvu = ds_loaidichvu[i];

                        var sql= "INSERT INTO cskh_loaidichvu (" +
                            "ma,"+
                            "mota,"+
                            "stt"+
                            ") VALUES (" +
                            "'"+loaidichvu['ma']+"'," +
                            "'"+loaidichvu['mota']+"'," +
                            "'"+loaidichvu['stt']+"'" +
                            ")";
                        tr.executeSql(sql, [], function(tr, rs) {
                        });
                    }
                }

            }, function(err) {
                showlog('Open database ERROR: ' + JSON.stringify(err));
            },function(){
                callback();
            });

        }
        catch (e){
            showlog("Not load SQLite");
            callback();
        }

    };

    this.insert_list_danhmuc_dichvu = function(data,callback){
        try {
            var db = window.openDatabase("demo", "1.0", "tutorial database", 1000000);
            db.transaction(function(tr) {
                var ds_danhmuc_loaidichvu = data;
                if(ds_danhmuc_loaidichvu.length > 0 ){

                    for(var i=0;i < ds_danhmuc_loaidichvu.length;i++){
                        var danhmuc_loaidichvu = ds_danhmuc_loaidichvu[i];

                        var sql= "INSERT INTO cskh_danhmuc_dichvu (" +
                            "ma,"+
                            "mota,"+
                            "ma_cha,"+
                            "nhom"+
                            ") VALUES (" +
                            "'"+danhmuc_loaidichvu['ma']+"'," +
                            "'"+danhmuc_loaidichvu['mota']+"'," +
                            "'"+danhmuc_loaidichvu['ma_cha']+"'," +
                            "'"+danhmuc_loaidichvu['nhom']+"'" +
                            ") ";
                        tr.executeSql(sql, [], function(tr, rs) {
                        });
                    }
                }

            }, function(err) {
                showlog('Open database ERROR: ' + JSON.stringify(err));
            },function(){
                callback();
            });

        }
        catch (e){
            showlog("Not load SQLite");
            callback();
        }

    };

    this.insert_list_danhmuc_dichvu_chitiet = function(data,callback){
        try {
            var db = window.openDatabase("demo", "1.0", "tutorial database", 1000000);
            db.transaction(function(tr) {
                var ds_danhmuc_loaidichvu = data;
                if(ds_danhmuc_loaidichvu.length > 0 ){

                    for(var i=0;i < ds_danhmuc_loaidichvu.length;i++){
                        var danhmuc_loaidichvu = ds_danhmuc_loaidichvu[i];

                        var sql= "INSERT INTO cskh_danhmuc_dichvu_chitiet (" +
                            "id,"+
                            "id_dichvu,"+
                            "id_nhomcanho"+
                            ") VALUES (" +
                            "'"+danhmuc_loaidichvu['id']+"'," +
                            "'"+danhmuc_loaidichvu['id_dichvu']+"'," +
                            "'"+danhmuc_loaidichvu['id_nhomcanho']+"'" +
                            ") ";
                        tr.executeSql(sql, [], function(tr, rs) {
                        });
                    }
                }

            }, function(err) {
                showlog('Open database ERROR: ' + JSON.stringify(err));
            },function(){
                callback();
            });

        }
        catch (e){
            showlog("Not load SQLite");
            callback();
        }

    };

    // UPDATE

    this.update_xemthongbao = function(username,loaithongbao,callback){
        try {
            var db = window.openDatabase("demo", "1.0", "tutorial database", 1000000);

            var today = new Date();
            var nam = today.getFullYear();
            var thang = today.getMonth()+1;
            var ngay = today.getDate();
            var gio = today.getHours();
            var phut = today.getMinutes();
            var giay = today.getSeconds();
            if((thang) < 10){
                thang = "0"+thang;
            }
            if((ngay) < 10){
                ngay = "0"+ngay;
            }
            if((gio) < 10){
                gio = "0"+gio;
            }
            if((phut) < 10){
                phut = "0"+phut;
            }
            if((giay) < 10){
                giay = "0"+giay;
            }
            var dateTime = nam+"-"+thang+"-"+ngay+" "+gio+":"+phut+":"+giay;
            db.transaction(function(tr) {
            //    showlog("Opened transaction");
                tr.executeSql("UPDATE thongbao SET trangthai='daxem',ngay_xem=strftime('%s','"+dateTime+"'),dongbo = '1' " +
                    " WHERE username='"+username+"' and loaithongbao='"+loaithongbao+"' and trangthai = 'chuaxem' " +
                    " and id_taikhoan_chitiet in ( select id from taikhoan_chitiet where trangthai ='dangSuDung' and username='"+ username +"' ) "+
                    "" , [], function(tr, rs) {
                    callback();
                });

            }, function(err) {
                showlog('Open database ERROR: ' + JSON.stringify(err));
            });
        }
        catch (e){
            showlog("Not load SQLite");
            callback();
        }
    };

    // SELECT
    this.selete_ds_taikhoan_chitiet = function(username,callback){
        try {
            var db = window.openDatabase("demo", "1.0", "tutorial database", 1000000);
            db.transaction(function(tr) {
                var sql="SELECT * FROM taikhoan_chitiet WHERE username='"+username+"'";
                // showlog(sql);
                tr.executeSql(sql, [], function(tr, rs) {
                    var data = [];
                    var len = rs.rows.length;
                    for (var i=0; i<len; i++){
                        var item = rs.rows.item(i);
                        data.push(item);
                    }
                    callback(data);
                });
            }, function(err) {
                showlog('Open database ERROR: ' + JSON.stringify(err));
            });
        }
        catch (e){
            showlog("Not load SQLite");
            callback([]);
        }
    };

    this.selete_thongtin_taikhoan_chitiet = function(id,callback){
        try {
            var db = window.openDatabase("demo", "1.0", "tutorial database", 1000000);
            db.transaction(function(tr) {
                var sql="SELECT * FROM taikhoan_chitiet WHERE id='"+id+"'";
                // showlog(sql);
                tr.executeSql(sql, [], function(tr, rs) {
                    var data;
                    try{
                        if(typeof (rs.rows) != "undefined"){
                            data = rs.rows.item(0);
                        }else{
                            data = [];
                        }
                    }catch (e){
                        data = [];
                    }
                    // showlog(data);
                    callback(data);
                });
            }, function(err) {
                showlog('Open database ERROR: ' + JSON.stringify(err));
            });
        }
        catch (e){
            showlog("Not load SQLite");
            callback([]);
        }

    };

    this.selete_ds_thongbao = function(username,loaithongbao,callback){
        try {
            var db = window.openDatabase("demo", "1.0", "tutorial database", 1000000);
            db.transaction(function(tr) {
                var sql="SELECT id,id_taikhoan_chitiet,noidung, " +
                    " datetime(ngay_tao,'unixepoch') as ngay_tao " +
                    "FROM thongbao " +
                    "WHERE username='"+username+"' " +
                    "and loaithongbao='"+loaithongbao+"' " +
                    "and id_taikhoan_chitiet in ( select id from taikhoan_chitiet where trangthai ='dangSuDung' and username='"+ username +"' ) "+
                    "and trangthai!='xoa' " +
                    "order by ngay_tao asc ";

                tr.executeSql(sql, [], function(tr, rs) {
                    var data = [];
                    var len = rs.rows.length;
                    for (var i=0; i<len; i++){
                        var item = rs.rows.item(i);
                        data.push(item);
                    }
                    callback(data);
                });

            }, function(err) {
                showlog('Open database ERROR: ' + JSON.stringify(err));
            });
        }
        catch (e){
            showlog("Not load SQLite");
            var data = [];
            // data[0] = {
            //     'id': 1,
            //     'ngay_tao': "2017-09-01 00:00:00",
            //     'noidung': "Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad <br>  Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad ",
            //     'trangthai': 'chuaxem',
            // }
            // data[1] = {
            //     'id': 1,
            //     'ngay_tao': "2017-09-01 00:00:00",
            //     'noidung': "Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad <br>  Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad ",
            //     'trangthai': 'chuaxem',
            // }
            // data[2] = {
            //     'id': 2,
            //     'ngay_tao': "2017-09-01 00:00:00",
            //     'noidung': "Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad <br>  Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad ",
            //     'trangthai': 'chuaxem',
            // }
            // data[3] = {
            //     'id': 3,
            //     'ngay_tao': "2017-09-01 00:00:00",
            //     'noidung': "Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad <br>  Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad ",
            //     'trangthai': 'chuaxem',
            // }
            // data[4] = {
            //     'id': 4,
            //     'ngay_tao': "2017-09-01 00:00:00",
            //     'noidung': "Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad <br>  Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad ",
            //     'trangthai': 'chuaxem',
            // }
            // data[5] = {
            //     'id': 5,
            //     'ngay_tao': "2017-09-01 00:00:00",
            //     'noidung': "Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad <br>  Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad ",
            //     'trangthai': 'chuaxem',
            // }
            callback(data);
        }

    };

    this.selete_max_ngay_thongbao = function(username,callback){
        try {
            var db = window.openDatabase("demo", "1.0", "tutorial database", 1000000);
            db.transaction(function(tr) {
                var sql="SELECT max(datetime(ngay_cnhat,'unixepoch')) as max_ngay " +
                    "FROM thongbao " +
                    "WHERE username='"+username+"' ";

                tr.executeSql(sql, [], function(tr, rs) {
                    var data;
                    try{
                        if(typeof (rs.rows) != "undefined"){
                            data = rs.rows.item(0)['max_ngay'];
                        }else{
                            data = null;
                        }
                    }catch (e){
                        data = null;
                    }
                    callback(data);
                });

            }, function(err) {
                showlog('Open database ERROR: ' + JSON.stringify(err));
            });
        }
        catch (e){
            showlog("Not load SQLite");
            callback(null);
        }
    };

    this.select_soluong_thongbaoChuaXem = function(username,callback){
        try {
            var db = window.openDatabase("demo", "1.0", "tutorial database", 1000000);
            db.transaction(function(tr) {
                var sql="SELECT loaithongbao,count(*) as soluong " +
                    "FROM thongbao " +
                    "WHERE username='"+username+"' and trangthai='chuaxem' " +
                    "and id_taikhoan_chitiet in ( select id from taikhoan_chitiet where trangthai ='dangSuDung' and username='"+ username +"' ) "+
                    "group by loaithongbao ";

                tr.executeSql(sql, [], function(tr, rs) {
                    var data = [];
                    var len = rs.rows.length;
                    for (var i=0; i<len; i++){
                        var item = rs.rows.item(i);
                        data.push(item);
                    }
                    callback(data);
                });

            }, function(err) {
                showlog('Open database ERROR: ' + JSON.stringify(err));
            });
        }
        catch (e){
            showlog("Not load SQLite");
            var data = [];
            // data[0] = {
            //     'id': 1,
            //     'ngay_tao': "2017-09-01 00:00:00",
            //     'noidung': "Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad <br>  Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad ",
            //     'trangthai': 'chuaxem',
            // }
            // data[1] = {
            //     'id': 1,
            //     'ngay_tao': "2017-09-01 00:00:00",
            //     'noidung': "Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad <br>  Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad ",
            //     'trangthai': 'chuaxem',
            // }
            // data[2] = {
            //     'id': 2,
            //     'ngay_tao': "2017-09-01 00:00:00",
            //     'noidung': "Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad <br>  Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad ",
            //     'trangthai': 'chuaxem',
            // }
            // data[3] = {
            //     'id': 3,
            //     'ngay_tao': "2017-09-01 00:00:00",
            //     'noidung': "Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad <br>  Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad ",
            //     'trangthai': 'chuaxem',
            // }
            // data[4] = {
            //     'id': 4,
            //     'ngay_tao': "2017-09-01 00:00:00",
            //     'noidung': "Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad <br>  Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad ",
            //     'trangthai': 'chuaxem',
            // }
            // data[5] = {
            //     'id': 5,
            //     'ngay_tao': "2017-09-01 00:00:00",
            //     'noidung': "Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad <br>  Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad ",
            //     'trangthai': 'chuaxem',
            // }
            callback(data);
        }

    };

    this.selete_ds_loaidichvu = function(callback){
        try {
            var db = window.openDatabase("demo", "1.0", "tutorial database", 1000000);
            db.transaction(function(tr) {
                var sql="SELECT * FROM cskh_loaidichvu ";

                tr.executeSql(sql, [], function(tr, rs) {
                    var data = [];
                    var len = rs.rows.length;
                    for (var i=0; i<len; i++){
                        var item = rs.rows.item(i);
                        data.push(item);
                    }
                    callback(data);
                });

            }, function(err) {
                showlog('Open database ERROR: ' + JSON.stringify(err));
            });
        }
        catch (e){
            showlog("Not load SQLite");
            callback();
        }

    };

    this.selete_ds_danhmuc_dichvu = function(id_duan,loaidichvu,callback){
        try {
            var db = window.openDatabase("demo", "1.0", "tutorial database", 1000000);
            db.transaction(function(tr) {
                var sql="SELECT l.ma,l.mota,g.mota as nhom,g.stt " +
                    " FROM cskh_danhmuc_dichvu l,cskh_loaidichvu g ,cskh_danhmuc_dichvu_chitiet ct " +
                    " where " +
                    " g.ma = l.ma_cha " +
                    " and l.ma = ct.id_dichvu " +
                    " and l.nhom='"+loaidichvu+"' " +
                    " and ct.id_nhomcanho='"+id_duan+"' " +
                    " order by g.stt ";
                // showlog(sql);
                tr.executeSql(sql, [], function(tr, rs) {
                    var data = [];
                    var len = rs.rows.length;
                    for (var i=0; i<len; i++){
                        var item = rs.rows.item(i);
                        data.push(item);
                    }
                    callback(data);
                });

            }, function(err) {
                showlog('Open database ERROR: ' + JSON.stringify(err));
            });
        }
        catch (e){
            showlog("Not load SQLite");
            callback([]);
        }

    };

    this.selete_taikhoan_chitiet = function(id,callback){
        try {
            var db = window.openDatabase("demo", "1.0", "tutorial database", 1000000);
            db.transaction(function(tr) {
                var sql="SELECT * FROM taikhoan_chitiet WHERE id='"+id+"'";

                tr.executeSql(sql, [], function(tr, rs) {
                    var data;
                    try{
                        if(typeof (rs.rows) != "undefined"){
                            data = rs.rows.item(0);
                        }else{
                            data = [];
                        }
                    }catch (e){
                        data = [];
                    }
                    // showlog(data);
                    callback(data);
                });

            }, function(err) {
                showlog('Open database ERROR: ' + JSON.stringify(err));
            });

        }
        catch (e){
            showlog("Not load SQLite");
            callback();
        }

    };

    this.selete_taikhoan_chitiet_top = function(callback){
        try {
            var db = window.openDatabase("demo", "1.0", "tutorial database", 1000000);
            db.transaction(function(tr) {
                var sql="SELECT * FROM taikhoan_chitiet ";
                tr.executeSql(sql, [], function(tr, rs) {
                    var data;
                    try{
                        if(typeof (rs.rows) != "undefined"){
                            data = rs.rows.item(0);
                        }else{
                            data = [];
                        }
                    }catch (e){
                        data = [];
                    }
                    // showlog(data);
                    callback(data);
                });

            }, function(err) {
                showlog('Open database ERROR: ' + JSON.stringify(err));
            });

        }
        catch (e){
            showlog("Not load SQLite");
            callback([]);
        }

    };

    this.selete_ds_thongbao_dongbo = function(username,callback){
        try {
            var db = window.openDatabase("demo", "1.0", "tutorial database", 1000000);
            db.transaction(function(tr) {
                var sql="SELECT id,trangthai, " +
                    " datetime(ngay_xem,'unixepoch') as ngay_xem " +
                    " FROM thongbao " +
                    " WHERE username='"+username+"' " +
                    " and id_taikhoan_chitiet in ( select id from taikhoan_chitiet where trangthai ='dangSuDung' and username='"+ username +"' ) "+
                    " and dongbo='1' " +
                    "order by ngay_xem asc ";

                tr.executeSql(sql, [], function(tr, rs) {
                    var data = [];
                    var len = rs.rows.length;
                    for (var i=0; i<len; i++){
                        var item = rs.rows.item(i);
                        data.push(item);
                    }
                    callback(data);
                });

            }, function(err) {
                showlog('Open database ERROR: ' + JSON.stringify(err));
            });
        }
        catch (e){
            showlog("Not load SQLite");
            var data = [];
            // data[0] = {
            //     'id': 1,
            //     'ngay_tao': "2017-09-01 00:00:00",
            //     'noidung': "Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad <br>  Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad ",
            //     'trangthai': 'chuaxem',
            // }
            // data[1] = {
            //     'id': 1,
            //     'ngay_tao': "2017-09-01 00:00:00",
            //     'noidung': "Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad <br>  Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad ",
            //     'trangthai': 'chuaxem',
            // }
            // data[2] = {
            //     'id': 2,
            //     'ngay_tao': "2017-09-01 00:00:00",
            //     'noidung': "Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad <br>  Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad ",
            //     'trangthai': 'chuaxem',
            // }
            // data[3] = {
            //     'id': 3,
            //     'ngay_tao': "2017-09-01 00:00:00",
            //     'noidung': "Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad <br>  Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad ",
            //     'trangthai': 'chuaxem',
            // }
            // data[4] = {
            //     'id': 4,
            //     'ngay_tao': "2017-09-01 00:00:00",
            //     'noidung': "Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad <br>  Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad ",
            //     'trangthai': 'chuaxem',
            // }
            // data[5] = {
            //     'id': 5,
            //     'ngay_tao': "2017-09-01 00:00:00",
            //     'noidung': "Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad <br>  Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad Test asdfa sda sdfa sdf asdf asdf asdf ad ",
            //     'trangthai': 'chuaxem',
            // }
            callback(data);
        }

    };



}

function showlog(data){
    var $$ = Dom7;
   // data = JSON.stringify(data);
   // $$('.view_log').append("<div>"+data+"</div>");
   //   console.log(data);
}

function showlog_modal(text,callback){
    var myApp = new Framework7();
    myApp.modal({
        title:  "Test",
        text: text,
        buttons: [
            {
                text: "OK",
                onClick: function() {
                    callback();
                }
            }
        ]
    });
}
/*
* Vi du : sqlite
* CREATE TABLE
*
 IF NOT EXISTS datetime_text (d1 int, d2 varchar(200));

 insert into datetime_text(d1,d2) values(
 strftime('%s','2017-04-24'),'Lý Xuân Trường'
 );

 select d2,datetime(d1,'unixepoch') as ngaysinh from datetime_text;

* */