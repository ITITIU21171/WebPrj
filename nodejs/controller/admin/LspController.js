const lspDB = require('../../model/admin/LspDB');

const layout = './admin/layoutAdmin';
let getLsp = (req, res) => {
    lspDB.getLspDB(function(data){
        res.render('admin/LoaiSanPham.ejs', {layout: layout, dataLsp: data, SttLsp: 0});
        res.end();
    })
}

let show = (req, res) => {
    lspDB.showDB(function(data){
        res.redirect('/admin/loai-san-pham');
        res.end();
    }, req.params.idLsp)
}

let hidden = (req, res) => {
    lspDB.hiddenDB(function(data){
        res.redirect('/admin/loai-san-pham');
        res.end();
    }, req.params.idLsp)
}

let createLsp = (req, res) => {
    lspDB.createLspDB(function(data){
        res.redirect('/admin/loai-san-pham');
        res.end();
    }, req.body.nameLsp);
}

let updateLsp = (req, res) => {
    lspDB.updateLspDB(function(data){
        res.redirect('/admin/loai-san-pham');
        res.end();
    }, req.body.nameLsp, req.params.idLsp);
}

let deleteLsp = (req, res) => {
    lspDB.deleteLspDB(function(data){
        res.redirect('/admin/loai-san-pham');
        res.end();
    }, req.params.idLsp)
}

module.exports = {
    getLsp, createLsp, updateLsp, deleteLsp, show, hidden
}

