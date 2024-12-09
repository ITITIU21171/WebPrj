const connection = require('../../connectDB');

function format_date(date) {
    return date.getFullYear() + "/" +
    ("0" + (date.getMonth()+1)).slice(-2) + "/" +
    ("0" + date.getDate()).slice(-2) + " " +
    ("0" + date.getHours()).slice(-2) + ":" +
    ("0" + date.getMinutes()).slice(-2) + ":" +
    ("0" + date.getSeconds()).slice(-2);
}

function getHdDB(callback) {
    connection.query(
        'SELECT hoadon.*, NgayMua, TenTT ' +
        'FROM hoadon '+
        'INNER JOIN trangthai ON trangthai.ID = hoadon.TrangThai ' +
        'ORDER BY NgayMua ASC; ' + 
        'SELECT cthoadon.IDSanPham, sanpham.TenSanPham, sanpham.imgName, xuatxu.XuatXu, sanpham.GiaBan, ' +
        'cthoadon.SoLuong, cthoadon.ThanhTien, cthoadon.ID_HoaDon ' +
        'FROM cthoadon ' +
        'INNER JOIN sanpham ON sanpham.ID = cthoadon.IDSanPham ' +
        'INNER JOIN xuatxu ON xuatxu.ID = sanpham.XuatXu ',
        function(err, results) {
            if(err) throw err;
            results[0].forEach(data => {
                data.NgayMua = format_date(data.NgayMua);
            });
            return callback(results);
        }
      );
}

function detailHdDB(callback, id){
    connection.query(
        'SELECT TenTK, MatKhau, taikhoan_kh.TrangThai as TT, NgayDK, ' +
        'hoadon.*, trangthai.TenTT, NgayMua  FROM hoadon ' +
        'INNER JOIN trangthai ON trangthai.ID = hoadon.TrangThai ' +
        'INNER JOIN taikhoan_kh ON taikhoan_kh.ID = hoadon.IDTK ' +
        'WHERE IDTK = ? ORDER BY NgayMua DESC ',[id],
        function(err, results) {
            if(err) throw err;
            results.forEach(data => {
                data.NgayDK = format_date(data.NgayDK);
                data.NgayMua = format_date(data.NgayMua);
            });
            return callback(results);
        }
    )
}

function nhanHdDB(callback, id){
    connection.query(
        'UPDATE `hoadon` SET TrangThai = 2 WHERE ID = ?', [id],
        function(err, results) {
            if(err) throw err;
            return callback(results);
        }
    )
}

function huyHdDB(callback, id){
    connection.query(
        'UPDATE `hoadon` SET TrangThai= 3 WHERE ID = ? ',[id],
        function(err, results) {
            if(err) throw err;
            return callback(results);
        }

    )
}

module.exports = {getHdDB, detailHdDB, nhanHdDB, huyHdDB};