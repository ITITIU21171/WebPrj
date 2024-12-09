const connection = require('../../connectDB');

function format_date(date) {
    return date.getFullYear() + "/" +
    ("0" + (date.getMonth()+1)).slice(-2) + "/" +
    ("0" + date.getDate()).slice(-2) + " " +
    ("0" + date.getHours()).slice(-2) + ":" +
    ("0" + date.getMinutes()).slice(-2) + ":" +
    ("0" + date.getSeconds()).slice(-2);
}

function getUserDB(callback) {
    connection.query(
        'SELECT ID, TenTK, MatKhau, TrangThai, NgayDK FROM `taikhoan_kh`',
        function(err, results) {
            if(err) throw err;
            results.forEach(data => {
                data.NgayDK = format_date(data.NgayDK);
            });
            return callback(results);
        }
      );
}

function detailProductDB(callback, id){
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

function receiptDetail(callback, id){
    connection.query(
        'SELECT taikhoan_kh.ID as IDTK, taikhoan_kh.TenTK, taikhoan_kh.MatKhau, taikhoan_kh.TrangThai as TTTK, NgayDK, hoadon.ID,  hoadon.TenKH, hoadon.DiaChi, hoadon.SDT, hoadon.TongTien, NgayMua, hoadon.GhiChu, trangthai.TenTT, cthoadon.IDSanPham, sanpham.TenSanPham, xuatxu.XuatXu, sanpham.GiaBan, cthoadon.SoLuong, cthoadon.ThanhTien FROM taikhoan_kh ' +
        'INNER JOIN hoadon ON taikhoan_kh.ID = hoadon.IDTK ' +
        'INNER JOIN trangthai ON hoadon.TrangThai = trangthai.ID ' +
        'INNER JOIN cthoadon ON hoadon.ID = cthoadon.ID_HoaDon ' +
        'INNER JOIN sanpham ON sanpham.ID = cthoadon.IDSanPham ' +
        'INNER JOIN xuatxu ON xuatxu.ID = sanpham.XuatXu ' +
        ' WHERE hoadon.ID = ? ', [id],
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

function lockupDB(callback, id){
    connection.query(
        'UPDATE taikhoan_kh SET TrangThai = 0 WHERE ID = ?',[id],
        function(err, results) {
            if(err) throw err;
            return callback(results);
        }

    )
}

function unlockDB(callback, id){
    connection.query(
        'UPDATE taikhoan_kh SET TrangThai = 1 WHERE ID = ?',[id],
        function(err, results) {
            if(err) throw err;
            return callback(results);
        }
    )
}

module.exports = {getUserDB, detailProductDB, receiptDetail, unlockDB, lockupDB};