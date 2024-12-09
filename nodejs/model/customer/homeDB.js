const connection = require('../../connectDB');

function getHome(callback) {
    connection.query(
        'SELECT * FROM `loaisanpham` WHERE showw != 0 ; ' + 
        'SELECT sanpham.ID, sanpham.ID_LoaiSanPham, sanpham.TenSanPham, sanpham.imgName, sanpham.GiaBan, sanpham.SoLuong, sanpham.show_lsp, sanpham.show_xx, sanpham.show_sp, xuatxu.XuatXu FROM sanpham INNER JOIN xuatxu ON xuatxu.ID = sanpham.XuatXu WHERE show_xx != 0 AND show_sp != 0 AND show_lsp != 0 ORDER BY sanpham.update_at DESC ',
        function(err, results) {
            if(err) throw err;
            return callback(results);
        }
      );
}

module.exports = {getHome};