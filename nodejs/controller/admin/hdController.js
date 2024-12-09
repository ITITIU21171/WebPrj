const hdDB = require('../../model/admin/hdDB');

const layout = './admin/layoutAdmin';
let getHd = (req, res) => {
    hdDB.getHdDB(function(data) {
        res.render('admin/hoaDon.ejs', {layout: layout, dataHd: data[0], dataCthd: data[1], Stt: 0});
        res.end();
    })
}

let detailHd = (req, res) => {
    hdDB.detailHdDB(function(data){
        res.render('admin/userDetailProduct.ejs', {layout: layout, dataDetail: data})
        res.end();
    }, req.params.idhd)
}

let nhanHd = (req, res) => {
    hdDB.nhanHdDB(function(data){
        res.redirect('/admin/hoa-don');
        res.end();
    }, req.params.idhd)
}

let huyHd = (req, res) => {
    hdDB.huyHdDB(function(data){
        res.redirect('/admin/hoa-don');
        res.end();
    }, req.params.idhd)
}

module.exports = {
    getHd,
    detailHd,
    nhanHd,
    huyHd,
}