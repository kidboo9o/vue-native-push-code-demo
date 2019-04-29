import Constants from "../GLOBAL_VARIABLES/Constants";
import {SQLite} from "expo";
const db = SQLite.openDatabase(Constants.DATABASE);
export default{
    nameTable: "thongbao",
    create: function () {
        db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS thongbao (' +
                'id INTEGER PRIMARY KEY,'+
                'username VARCHAR(255),'+
                'id_taikhoan_chitiet INTEGER,'+
                'loaithongbao INTEGER,'+
                'noidung VARCHAR(1000),'+
                'ngay_tao TIMESTAMP,' +
                'ngay_xem TIMESTAMP,' +
                'ngay_xoa TIMESTAMP,' +
                'ngay_cnhat TIMESTAMP,' +
                'trangthai VARCHAR(45),'+
                'tieude VARCHAR(255),'+
                'link_hinh VARCHAR(1000),'+
                'link_hinh_cached VARCHAR(1000)'+
                ')', [],
                (tx, success) => {
                    console.log(`tạo bảng ${this.nameTable} thành công`);
                },
                (tx, error) => {
                    console.log(`tạo bảng ${this.nameTable} thất bại`);
                    console.log(error);
                }
            );
        });
    },
    insert: function (data) {
        if (typeof data === "object" && Array.isArray(data)) {
            db.transaction(tx => {
                tx.executeSql('INSERT INTO thongbao (' +
                    'id,'+
                    'username,'+
                    'id_taikhoan_chitiet,'+
                    'loaithongbao,'+
                    'noidung,'+
                    'ngay_tao,' +
                    'ngay_xem,' +
                    'ngay_xoa,' +
                    'ngay_cnhat,' +
                    'trangthai,'+
                    'tieude,'+
                    'link_hinh,'+
                    'link_hinh_cached'+
                    ') VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', data,
                    (tx, success) => {
                        console.log(`Chèn dữ liệu vào bảng ${this.nameTable} thành công với dữ liệu cụ thể là : `);
                        console.log(`id : ${data[0]}`);
                        console.log(`username : ${data[1]}`);
                        console.log(`id_taikhoan_chitiet : ${data[2]}`);
                        console.log(`loaithongbao : ${data[3]}`);
                        console.log(`noidung : ${data[4]}`);
                        console.log(`ngay_tao : ${data[5]}`);
                        console.log(`ngay_xem : ${data[6]}`);
                        console.log(`ngay_xoa : ${data[7]}`);
                        console.log(`ngay_cnhat : ${data[8]}`);
                        console.log(`trangthai : ${data[9]}`);
                        console.log(`tieude : ${data[10]}`);
                        console.log(`link_hinh : ${data[11]}`);
                        console.log(`link_hinh_cached : ${data[12]}`);
                    },
                    (tx, error) => {
                        console.log(`Chèn dữ liệu vào bảng ${this.nameTable} thất bại`);
                        console.log(error);
                    }
                );
            });

        } else {
            console.log("data truyền vào phải làm mảng mới có thể chèn vào trong bảng : " + this.nameTable);
        }
    },
}