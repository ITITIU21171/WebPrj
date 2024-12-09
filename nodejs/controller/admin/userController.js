const userDB = require('../../model/admin/userDB');

const layout = './admin/layoutAdmin';
let getUser = (req, res) => {
    userDB.getUserDB(function(data) {
        res.render('admin/user.ejs', {layout: layout, dataUser: data});
        res.end();
    })
}

let detailProduct = (req, res) => {
    userDB.detailProductDB(function(data){
        res.render('admin/userDetailProduct.ejs', {layout: layout, dataDetail: data})
        res.end();
    }, req.params.idUser)
}

let receiptDetail = (req, res) => {
    userDB.receiptDetail(function(data){
        res.render('admin/receiptDetail.ejs', {layout: layout, dataDetail: data, STT: 0})
        res.end();
    }, req.params.idReceipt)
}

let lockup = (req, res) => {
    userDB.lockupDB(function(data){
        res.redirect('/admin/user');
        res.end();
    }, req.params.idUser)
}

let unlock = (req, res) => {
    userDB.unlockDB(function(data){
        res.redirect('/admin/user');
        res.end();
    }, req.params.idUser)
}

module.exports = {
    getUser,
    detailProduct,
    receiptDetail,
    lockup,
    unlock
}