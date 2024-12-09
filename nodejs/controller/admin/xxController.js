const xxDB = require('../../model/admin/xxDB');

const layout = './admin/layoutAdmin';
let getXx = (req, res) => {
    xxDB.getxxDB(function(data){
        res.render('admin/XuatXu.ejs', {layout: layout, dataXx: data, SttXx: 0});
        res.end();
    })
}

let show = (req, res) => {
    xxDB.showDB(function(data){
        res.redirect('/admin/xuat-xu-san-pham');
        res.end();
    }, req.params.idXx)
}

let hidden = (req, res) => {
    xxDB.hiddenDB(function(data){
        res.redirect('/admin/xuat-xu-san-pham');
        res.end();
    }, req.params.idXx)
}

let createXx = (req, res) => {
    xxDB.createxxDB(function(data){
        res.redirect('/admin/xuat-xu-san-pham');
        res.end();
    }, req.body.nameXx);
}

let updateXx = (req, res) => {
    xxDB.updatexxDB(function(data){
        res.redirect('/admin/xuat-xu-san-pham');
        res.end();
    }, req.body.nameXx, req.params.idXx);
}

let deleteXx = (req, res) => {
    xxDB.deletexxDB(function(data){
        res.redirect('/admin/xuat-xu-san-pham');
        res.end();
    }, req.params.idXx)
}

module.exports = {
    getXx, createXx, updateXx, deleteXx, show, hidden
}

