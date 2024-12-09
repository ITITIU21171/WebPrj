const connection = require('../../connectDB');

function selectLogin(result, tk, mk) {
    connection.query(
        'SELECT * FROM taikhoan_admin WHERE BINARY TenTK = ? AND BINARY MatKhau = ?', [tk, mk],
        function(err, results) {
            if (err) throw err;

            // Return the result of the query
            return result(results);
        }
    );
}

module.exports = { selectLogin };