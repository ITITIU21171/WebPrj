const connection = require('../../connectDB');

function format_date(date) {
    return date.getFullYear() + "/" +
    ("0" + (date.getMonth()+1)).slice(-2) + "/" +
    ("0" + date.getDate()).slice(-2) + " " +
    ("0" + date.getHours()).slice(-2) + ":" +
    ("0" + date.getMinutes()).slice(-2) + ":" +
    ("0" + date.getSeconds()).slice(-2);
}

function strToArray(str){
    array =  str.split(",");
    return array;
}

let getspDB = (callback) => {
    connection.query(
        'SELECT sanpham.ID, ID_LoaiSanPham, xuatxu.ID as ID_XuatXu, loaisanpham.Ten as LoaiSanPham, imgName, Image, TenSanPham, GiaNhap, GiaBan, SoLuong, NgayNhap, sanpham.update_at, xuatxu.XuatXu, show_sp, show_lsp, show_xx FROM sanpham INNER JOIN loaisanpham ON loaisanpham.ID = sanpham.ID_LoaiSanPham INNER JOIN xuatxu ON xuatxu.ID = sanpham.XuatXu ; ' + 
        'SELECT ID, Ten as LoaiSanPham, showw FROM loaisanpham ; ' + 
        'SELECT ID, XuatXu, showw FROM xuatxu ' ,
        function(err, results) {
            if(err) throw err;
            results[0].forEach(data => {
                data.NgayNhap = format_date(data.NgayNhap);
                data.update_at = format_date(data.update_at);
            });
            return callback(results);
        }
    );
  
}

function showDB(callback, id){
    connection.query(
        'UPDATE sanpham SET show_sp = 1 WHERE ID = ? ',
        [id],
        function(err, results) {
            if(err) throw err;
            return callback(results);
        }

    )
}

function hiddenDB(callback, id){
    connection.query(
        'UPDATE sanpham SET show_sp = 0 WHERE ID = ? ',
        [id],
        function(err, results) {
            if(err) throw err;
            return callback(results);
        }
    )
}

let createspDB = (callback, dataCreate) => {
    loaiSanPham = strToArray(dataCreate.loaiSp);
    xuatXu = strToArray(dataCreate.xuatXu);
    connection.query(
        'INSERT INTO sanpham(ID_LoaiSanPham, imgName, Image, TenSanPham, GiaNhap, GiaBan, SoLuong, NgayNhap, update_at, XuatXu, show_lsp, show_xx, show_sp) VALUES(?, ?, ?, ?, ?, ?, ?, now(), now(), ?, ?, ?, ?)',
        [loaiSanPham[0], dataCreate.imgName, dataCreate.image, dataCreate.tenSp, dataCreate.giaNhap, dataCreate.giaBan, dataCreate.soLuong, xuatXu[0], loaiSanPham[1], xuatXu[1], 1],
        function(err, results) {
            if(err) {
                console.error(err.stack);
                throw err;
            }
            return callback(results);
        }
    );
}

let updatespDB = (callback, dataUpdate, idSp) => {
    loaiSanPham = strToArray(dataUpdate.loaiSp);
    xuatXu = strToArray(dataUpdate.xuatXu);
    if (!dataUpdate.image){
        connection.query(
            'UPDATE sanpham SET ID_LoaiSanPham = ?, TenSanPham = ?, GiaNhap = ?, GiaBan = ?, SoLuong = ?, update_at = now(), XuatXu = ?, show_lsp = ?, show_xx = ? WHERE ID = ?', 
            [loaiSanPham[0], dataUpdate.tenSp, dataUpdate.giaNhap, dataUpdate.giaBan, dataUpdate.soLuong, xuatXu[0], loaiSanPham[1], xuatXu[1], idSp],
            function(err, results) {
                if(err) throw err;
                return callback(results);
            }
        );
    }else{
        connection.query(
            'UPDATE sanpham SET ID_LoaiSanPham = ?, imgName = ?, Image = ?, TenSanPham = ?, GiaNhap = ?, GiaBan = ?, SoLuong = ?, update_at = now(), XuatXu = ?, show_lsp = ?, show_xx = ? WHERE ID = ?', 
            [loaiSanPham[0], dataUpdate.imgName, dataUpdate.image, dataUpdate.tenSp, dataUpdate.giaNhap, dataUpdate.giaBan, dataUpdate.soLuong, xuatXu[0], loaiSanPham[1], xuatXu[1], idSp],
            function(err, results) {
                if(err) throw err;
                return callback(results);
            }
        );
    }
    
}

let deletespDB = (callback, idSp) => {
    connection.query(
        'DELETE FROM sanpham WHERE ID = ?', [idSp],
        function(err, results) {
            if(err) throw err;
            return callback(results);
        }
    );
}

module.exports = {
    getspDB, createspDB, updatespDB, deletespDB, showDB, hiddenDB
}