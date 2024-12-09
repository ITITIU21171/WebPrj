
const connection = require('../../connectDB');

function getHeader(callback) {
    connection.query(
        'SELECT * FROM loaisanpham WHERE showw != 0 ; ' + 
        'SELECT * FROM xuatxu WHERE showw != 0',
        function(err, results) {
            if(err) throw err;
            return callback(results);
        }
      );
}

module.exports = {getHeader};