const connection = require('../../connectDB');

function format_date(date) {
    return date.getFullYear() + "/" +
    ("0" + (date.getMonth()+1)).slice(-2) + "/" +
    ("0" + date.getDate()).slice(-2) + " " +
    ("0" + date.getHours()).slice(-2) + ":" +
    ("0" + date.getMinutes()).slice(-2) + ":" +
    ("0" + date.getSeconds()).slice(-2);
}

let getxxDB = (callback) => {
    connection.query(
        'SELECT ID, XuatXu, NgayThem, update_at, showw FROM xuatxu ORDER BY update_at DESC; ',
        function(err, results) {
            if(err) throw err;
            results.forEach(data => {
                data.NgayThem = format_date(data.NgayThem);
                data.update_at = format_date(data.update_at);
            });
            return callback(results);
        }
    );
}

function showDB(callback, id){
    connection.query(
        'UPDATE xuatxu SET showw = 1 WHERE ID = ?; ' +
        'UPDATE sanpham SET show_xx = 1 WHERE XuatXu = ? ',
        [id, id],
        function(err, results) {
            if(err) throw err;
            return callback(results);
        }

    )
}

function hiddenDB(callback, id){
    connection.query(
        'UPDATE xuatxu SET showw = 0 WHERE ID = ? ; ' + 
        'UPDATE sanpham SET show_xx = 0 WHERE XuatXu = ? ',
        [id, id],
        function(err, results) {
            if(err) throw err;
            return callback(results);
        }
    )
}

let createxxDB = (callback, xxName) => {
    connection.query(
        'INSERT INTO xuatxu(XuatXu, NgayThem, update_at) VALUES (?, now(), now())',[xxName],
        function(err, results) {
            if(err) throw err;
            return callback(results);
        }
    );
}

let updatexxDB = (callback, xxName, idXx) => {
 
    connection.query(
        'UPDATE xuatxu SET XuatXu = ?, update_at = now() WHERE ID = ?', [xxName, idXx],
        function(err, results) {
            if(err) throw err;
            return callback(results);
        }
    );
}

let deletexxDB = (callback, idXx) => {
    connection.query(
        'DELETE FROM sanpham WHERE XuatXu = ?; DELETE FROM xuatxu WHERE ID = ?', [idXx, idXx],
        function(err, results) {
            if(err) throw err;
            return callback(results);
        }
    );
}

module.exports = {
    getxxDB, createxxDB, updatexxDB, deletexxDB, showDB, hiddenDB
}