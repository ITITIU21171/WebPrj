const connection = require('../../connectDB');

function format_date(date) {
    return date.getFullYear() + "/" +
    ("0" + (date.getMonth()+1)).slice(-2) + "/" +
    ("0" + date.getDate()).slice(-2) + " " +
    ("0" + date.getHours()).slice(-2) + ":" +
    ("0" + date.getMinutes()).slice(-2) + ":" +
    ("0" + date.getSeconds()).slice(-2);
}

function getDetail(callback, idSP, idLsp) {
    connection.query(
        'SELECT sanpham.ID, ID_LoaiSanPham, xuatxu.ID as ID_XuatXu, loaisanpham.Ten as LoaiSanPham, imgName, TenSanPham, GiaNhap, GiaBan, SoLuong, xuatxu.XuatXu, show_sp, show_lsp, show_xx FROM sanpham INNER JOIN loaisanpham ON loaisanpham.ID = sanpham.ID_LoaiSanPham INNER JOIN xuatxu ON xuatxu.ID = sanpham.XuatXu WHERE sanpham.ID = ? ; ' + 
        'SELECT sanpham.ID, sanpham.ID_LoaiSanPham, sanpham.TenSanPham, sanpham.imgName, sanpham.GiaBan, sanpham.SoLuong, sanpham.show_lsp, sanpham.show_xx, sanpham.show_sp, xuatxu.XuatXu FROM sanpham INNER JOIN xuatxu ON xuatxu.ID = sanpham.XuatXu WHERE show_xx != 0 AND show_sp != 0 AND show_lsp != 0 AND ID_LoaiSanPham = ? AND sanpham.ID != ? ORDER BY sanpham.update_at DESC ',
        [idSP, idLsp, idSP],
        function(err, results) {
            if(err) throw err;
            return callback(results);
        }
      );
}

function getLoaiSanPham(callback, idLsp) {
    connection.query(
        'SELECT sanpham.ID, sanpham.ID_LoaiSanPham, loaisanpham.Ten,sanpham.TenSanPham, sanpham.imgName, sanpham.GiaBan, sanpham.SoLuong, sanpham.show_lsp, sanpham.show_xx, sanpham.show_sp, xuatxu.XuatXu ' +
        'FROM sanpham ' +
        'INNER JOIN xuatxu ON xuatxu.ID = sanpham.XuatXu ' +
        'INNER JOIN loaisanpham ON loaisanpham.ID = sanpham.ID_LoaiSanPham ' +
        'WHERE show_xx != 0 AND show_sp != 0 AND show_lsp != 0 AND ID_LoaiSanPham = ? ORDER BY sanpham.update_at DESC ',
        [idLsp],
        function(err, results) {
            if(err) throw err;
            return callback(results);
        }
      );
}

function getXuatXu(callback, idXx) {
    connection.query(
        'SELECT sanpham.ID, sanpham.XuatXu as ID_XuatXu, loaisanpham.Ten,sanpham.TenSanPham, sanpham.imgName, sanpham.GiaBan, sanpham.SoLuong, sanpham.show_lsp, sanpham.show_xx, sanpham.show_sp, xuatxu.XuatXu ' +
        'FROM sanpham ' +
        'INNER JOIN xuatxu ON xuatxu.ID = sanpham.XuatXu ' +
        'INNER JOIN loaisanpham ON loaisanpham.ID = sanpham.ID_LoaiSanPham ' +
        'WHERE show_xx != 0 AND show_sp != 0 AND show_lsp != 0 AND sanpham.XuatXu = ? ORDER BY sanpham.update_at DESC ',
        [idXx],
        function(err, results) {
            if(err) throw err;
            return callback(results);
        }
      );
}

function searchSanPham(callback, key) {
    let keyy = '%' + key + '%';
    connection.query(
        'SELECT sanpham.ID, sanpham.ID_LoaiSanPham, loaisanpham.Ten,sanpham.TenSanPham, sanpham.imgName, sanpham.GiaBan, sanpham.SoLuong, sanpham.show_lsp, sanpham.show_xx, sanpham.show_sp, xuatxu.XuatXu ' +
        'FROM sanpham ' +
        'INNER JOIN xuatxu ON xuatxu.ID = sanpham.XuatXu ' +
        'INNER JOIN loaisanpham ON loaisanpham.ID = sanpham.ID_LoaiSanPham ' +
        'WHERE show_xx != 0 AND show_sp != 0 AND show_lsp != 0 AND sanpham.TenSanPham LIKE ? ORDER BY sanpham.update_at DESC ',
        [keyy],
        function(err, results) {
            if(err) throw err;
            return callback(results);
        }
      );
}

function isCart(callback, idTk, idSp) {
    connection.query(
        'SELECT * FROM giohang WHERE giohang.IDTK = ? AND giohang.IDSanPham = ?',
        [idTk, idSp],
        function(err, results) {
            if(err) throw err;
            return callback(results);
        }
      );
}

function addToCart(callback, data, idTk) {
    isCart((dataCart) => {
        if(!dataCart[0]){
            connection.query(
                'INSERT INTO giohang(IDTK, IDSanPham, TenSanPham, XuatXu, DonGia, SoLuong, ThanhTien) VALUES (?,?,?,?,?,?,?) ; ' + 
                'UPDATE sanpham SET SoLuong = ? WHERE ID = ?',
                [idTk, data.idSp, data.TenSP, data.XuatXu, data.DonGia, data.SoLuongMua, data.DonGia*data.SoLuongMua, data.SoLuongCo-data.SoLuongMua, data.idSp],
                function(err, results) {
                    if(err) throw err;
                    return callback(results);
                }
              );
        }else{
            connection.query(
                'UPDATE giohang SET SoLuong=SoLuong + ?,ThanhTien=DonGia * SoLuong WHERE IDTK = ? AND IDSanPham = ? ;' + 
                'UPDATE sanpham SET SoLuong= ? WHERE ID = ?',
                [data.SoLuongMua, idTk, data.idSp, data.SoLuongCo-data.SoLuongMua, data.idSp],
                function(err, results) {
                    if(err) throw err;
                    return callback(results);
                }
              );
        }
    }, idTk, data.idSp);
}

let arrCart = [];
let arrCartRow = [];

function getCart(callback, idTk) {
    arrCart = [];
    connection.query(
        'SELECT giohang.*, sanpham.SoLuong as SoLuongSpTrongKho FROM giohang INNER JOIN sanpham ON sanpham.ID = giohang.IDSanPham WHERE giohang.IDTK = ?',
        [idTk],
        function(err, results) {
            if(err) throw err;
            results.forEach(data => {
                arrCartRow.push(data.IDSanPham);
                arrCartRow.push(data.SoLuong);
                arrCartRow.push(data.ThanhTien);
                arrCart.push(arrCartRow);
                arrCartRow = [];
            });
            return callback(results);
        }
      );
}

function updateCart(callback, idTk, data){
    let SoLuong = Number(data.SoLuong);
    let SoLuongBanDau = Number(data.SoLuongBanDau);
    if(SoLuong<SoLuongBanDau){
        let subtraction = SoLuongBanDau - SoLuong;
        connection.query(
            'UPDATE giohang SET SoLuong = ?,ThanhTien = DonGia * SoLuong WHERE IDTK = ? AND IDSanPham = ? ;' + 
            'UPDATE sanpham SET SoLuong = SoLuong + ? WHERE ID = ?',
            [SoLuong, idTk, data.idSanPham, subtraction, data.idSanPham],
            function(err, results) {
                if(err) throw err;
                return callback(results);
            }
        );
    }
    if(SoLuong>SoLuongBanDau){
        let addition  = SoLuong - SoLuongBanDau;
        connection.query(
            'UPDATE giohang SET SoLuong = ?,ThanhTien = DonGia * SoLuong WHERE IDTK = ? AND IDSanPham = ? ;' + 
            'UPDATE sanpham SET SoLuong = SoLuong - ? WHERE ID = ?',
            [SoLuong, idTk, data.idSanPham, addition, data.idSanPham],
            function(err, results) {
                if(err) throw err;
                return callback(results);
            }
        );
    }
    if(SoLuong == SoLuongBanDau){
        return callback();
    }
}

function deleteCart(callback, data) {
    connection.query(
        ' DELETE FROM giohang WHERE giohang.ID = ? ; ' + 
        ' UPDATE sanpham SET SoLuong = SoLuong + ? WHERE ID = ? ',
        [data.idCart, data.SoLuong, data.idSp],
        function(err, results) {
            if(err) throw err;
            return callback(results);
        }
      );
}

function selectFirstId(callback, idTk, data){
    let diachi = data.DiaChiCuThe + ' - ' + data.xa + ' - ' + data.quanhuyen + ' - ' + data.tinhtp;
    connection.query(
        'INSERT INTO hoadon(IDTK, TenKH, DiaChi, SDT, TongTien, NgayMua, GhiChu, TrangThai) ' +
        'VALUES (?, ?, ?, ?, ?, NOW(),?, 1) ; ',
        [
            idTk, data.ho_ten, diachi, data.sdt, data.tongThanhTien, data.ghi_chu
        ],
        function(err, results) {
            if(err) throw err;
            return callback(results);
        }
      );
}

function orderCart(callback, data, idTk) {
    selectFirstId((data) => {
        for (let index = 0; index < arrCart.length; index++) {
            arrCart[index].splice(0, 0, data.insertId);
        }
        connection.query(
            'INSERT INTO cthoadon(ID_HoaDon, IDSanPham, SoLuong, ThanhTien) ' +
            'VALUES ? ;' + 
            'DELETE FROM giohang WHERE IDTK = ?',
            [
                arrCart, idTk
            ],
            function(err, results) {
                if(err) throw err;
                arrCart = [];
                return callback(results);
            }
          );
    }, idTk, data);
}

function donHang(callback, idTk) {
    connection.query(
        'SELECT TenKH, DiaChi, SDT, TongTien, NgayMua, GhiChu, trangthai.TenTT, hoadon.ID FROM hoadon ' + 
        'INNER JOIN trangthai ON trangthai.ID = hoadon.TrangThai WHERE IDTK = ? AND TrangThai = 1 ORDER BY NgayMua DESC ',
        [idTk],
        function(err, results) {
            if(err) throw err;
            results.forEach(data => {
                data.NgayMua = format_date(data.NgayMua);
            });
            return callback(results);
        }
      );
}

function lichSuDonHang(callback, idTk) {
    connection.query(
        'SELECT TenKH, DiaChi, SDT, TongTien, NgayMua, GhiChu, trangthai.TenTT, hoadon.ID FROM hoadon ' +
        'INNER JOIN trangthai ON trangthai.ID = hoadon.TrangThai WHERE IDTK = ? AND (TrangThai = 2 OR TrangThai = 3) ORDER BY NgayMua DESC ',
        [idTk],
        function(err, results) {
            if(err) throw err;
            results.forEach(data => {
                data.NgayMua = format_date(data.NgayMua);
            });
            return callback(results);
        }
      );
}

function chiTietDonHang(callback, idDh){
    connection.query(
        'SELECT TenKH, DiaChi, SDT, TongTien, NgayMua, GhiChu, trangthai.TenTT FROM hoadon ' + 
        'INNER JOIN trangthai ON trangthai.ID = hoadon.TrangThai WHERE hoadon.ID = ? ;' + 
        'SELECT sanpham.TenSanPham, xuatxu.XuatXu, sanpham.GiaBan as DonGia, cthoadon.SoLuong, cthoadon.ThanhTien ' +
        'FROM cthoadon ' +
        'INNER JOIN sanpham ON sanpham.ID = cthoadon.IDSanPham ' +
        'INNER JOIN xuatxu ON xuatxu.ID = sanpham.XuatXu ' +
        'WHERE cthoadon.ID_HoaDon = ?',
        [idDh, idDh],
        function(err, results) {
            if(err) throw err;
            results[0].forEach(data => {
                data.NgayMua = format_date(data.NgayMua);
            });
            return callback(results);
        }
      );
}

function huyDonHang(callback, id){
    connection.query(
        'UPDATE `hoadon` SET TrangThai= 3 WHERE ID = ? ',[id],
        function(err, results) {
            if(err) throw err;
            return callback(results);
        }

    )
}

module.exports = {
    getDetail, getLoaiSanPham, getXuatXu, searchSanPham, addToCart, getCart, updateCart,
    deleteCart, orderCart, donHang, chiTietDonHang, lichSuDonHang, huyDonHang
};