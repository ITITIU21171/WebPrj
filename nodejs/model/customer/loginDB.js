const connection = require('../../connectDB');

function selectLogin(result, tk, mk) {
    connection.query(
        'SELECT * FROM taikhoan_kh WHERE BINARY TenTK = ? AND BINARY MatKhau = ?', [tk, mk],
        function(err, results) {
            if (err) throw err;

            // Return the result of the query (success or failure)
            return result(results);
        }
    );
}

function postSignUp(result, tk, mk) {
    connection.query(
        'INSERT INTO `taikhoan_kh`(`TenTK`, MatKhau, TrangThai, NgayDK) VALUES (?, ?, 1, now())', [tk, mk],
        function(err, results) {
            if (err) throw err;

            // Return the result of the insertion query
            return result(results);
        }
    );
}

function isPass(callback, mktk, mkinput) {
    connection.query(
        'SELECT * FROM taikhoan_kh WHERE TenTK = ? AND MatKhau = ?', [mktk.TenTK, mkinput],
        function(err, results) {
            if (err) throw err;

            // Check if the password matches and return true/false
            return callback(results.length > 0);
        }
    );
}

function postChangePass(callback, mk, id) {
    connection.query(
        'UPDATE taikhoan_kh SET `MatKhau`= ? WHERE ID = ?', [mk, id.ID],
        function(err, results) {
            if (err) throw err;

            // Return the result of the password update query
            return callback(results);
        }
    );
}

module.exports = { selectLogin, postSignUp, postChangePass, isPass };