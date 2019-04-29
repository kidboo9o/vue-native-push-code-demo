import Constants from "../GLOBAL_VARIABLES/Constants";
import {SQLite} from "expo";
const db = SQLite.openDatabase(Constants.DATABASE);
export default{
    nameTable: "taikhoan_chitiet",
    create: function () {
        db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS taikhoan_chitiet (' +
                'id INTEGER PRIMARY KEY,' +
                'username VARCHAR(255),' +
                'ma_canho VARCHAR(100),' +
                'id_duan INTEGER,' +
                'ten_duan VARCHAR(250),' +
                'diachi_duan VARCHAR(500),' +
                'tang VARCHAR(100),' +
                'ten_khang VARCHAR(500),' +
                'loai_canho VARCHAR(50),' +
                'ten_loaicanho VARCHAR(200),' +
                'trangthai VARCHAR(20),' +
                'ngay_sua TIMESTAMP' +
                ')', [],
                (tx, success) => {
                    console.log(`tạo bảng ${this.nameTable} thành công`);
                },
                (tx, error) => {
                    console.log(`tạo bảng ${this.nameTable} thất bại`);
                }
            );
        });
    },
    insert: function (data) {
        if (typeof data === "object" && Array.isArray(data)) {
            db.transaction(tx => {
                tx.executeSql('INSERT INTO taikhoan_chitiet (' +
                    'id,' +
                    'username,' +
                    'ma_canho,' +
                    'id_duan,' +
                    'ten_duan,' +
                    'diachi_duan,' +
                    'tang,' +
                    'ten_khang,' +
                    'loai_canho,' +
                    'ten_loaicanho,' +
                    'trangthai,' +
                    'ngay_sua' +
                    ') VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', data,
                    (tx, success) => {
                        console.log(`Chèn dữ liệu vào bảng ${this.nameTable} thành công với dữ liệu cụ thể là : `);
                        console.log(`id : ${data[0]}`);
                        console.log(`username : ${data[1]}`);
                        console.log(`ma_canho : ${data[2]}`);
                        console.log(`id_duan : ${data[3]}`);
                        console.log(`ten_duan : ${data[4]}`);
                        console.log(`diachi_duan : ${data[5]}`);
                        console.log(`tang : ${data[6]}`);
                        console.log(`ten_khang : ${data[7]}`);
                        console.log(`loai_canho : ${data[8]}`);
                        console.log(`ten_loaicanho : ${data[9]}`);
                        console.log(`trangthai : ${data[10]}`);
                        console.log(`ngay_sua : ${data[11]}`);
                    },
                    (tx, error) => {
                        console.log(`Chèn dữ liệu vào bảng ${this.nameTable} thất bại`);
                    }
                );
            });

        } else {
            console.log("data truyền vào phải làm mảng mới có thể chèn vào trong bảng : " + this.nameTable);
        }
    },
    select: function () {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql('SELECT * FROM taikhoan_chitiet', [],
                    (tx, {rows}) => {
                        console.log(`Lấy toàn bộ dữ liệu trong bảng ${this.nameTable} thành công`);
                        resolve(rows._array);
                    },
                    (tx, error) => {
                        console.log(`Lấy toàn bộ dữ liệu trong bảng ${this.nameTable} thất bại`);
                        reject(error);
                    }
                );
            });
        })
    },
    delete: function () {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM taikhoan_chitiet', [],
                (tx, success) => {
                    console.log(`Xóa tất cả dữ liệu trong bảng ${this.nameTable} thành công`);
                    console.log(success);
                },
                (tx, error) => {
                    console.log(`Xóa tất cả dữ liệu trong bảng ${this.nameTable} thất bại`);
                    console.log(error);
                }
            );
        });
    },
    count: function () {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql('SELECT COUNT(id) FROM taikhoan_chitiet', [],
                    (tx, {rows}) => {
                        console.log(`Đếm số dòng trong bảng ${this.nameTable} thành công`);
                        resolve(Object.values(rows._array[0])[0]);
                    },
                    (tx, error) => {
                        console.log(`Đếm số dòng trong bảng ${this.nameTable} thất bại`);
                        reject(error);
                    }
                );
            });
        })
    }
}