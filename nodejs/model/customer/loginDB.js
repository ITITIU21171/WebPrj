
const connection = require('../../connectDB');

function selectLogin(result, tk, mk) {
    connection.query(
        'SELECT * FROM `taikhoan_kh` WHERE BINARY TenTK = ? AND BINARY MatKhau = PASSWORD(?)', [tk, mk],
        function(err, results) {
            if(err) throw err;
            return result(results);
        }
      );
}

function postSignUp(result, tk, mk) {
    connection.query(
        'INSERT INTO `taikhoan_kh`(`TenTK`, `MatKhau`, `TrangThai`, `NgayDK`) VALUES (?, PASSWORD(?), 1, now())', [tk, mk],
        function(err, results) {
            if(err) throw err;
            return result(results);
        }
      );
}

function isPass(callback, mktk, mkinput){

    connection.query(
        'SELECT * FROM `taikhoan_kh` WHERE TenTK = ? AND MatKhau = PASSWORD(?) ' , [mktk.TenTK, mkinput],
        function(err, results) {
            if(err) throw err;
            return callback(results);
        }
    )
}

function postChangePass(callback, mk, id){
    connection.query(
        'UPDATE `taikhoan_kh` SET `MatKhau`= PASSWORD(?) WHERE ID = ? ' , [mk, id.ID],
        function(err, results) {
            if(err) throw err;
            return callback(results);
        }
    )
}

module.exports = {selectLogin, postSignUp, postChangePass, isPass};