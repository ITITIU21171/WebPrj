const express = require('express')
const loginController = require('../../controller/admin/loginController');
const homeController = require('../../controller/admin/homeController');
const userController = require('../../controller/admin/userController');
const lspController = require('../../controller/admin/LspController');
const xxController = require('../../controller/admin/xxController');
const spController = require('../../controller/admin/spController');
const hdController = require('../../controller/admin/hdController');
const statisticalController = require('../../controller/admin/statisticalController');

const route = express.Router()

function isLogin(req, res, next){
    if (req.session.isLoginAdmin){
        next();
    }else{
        res.redirect('/admin/login');
    }
}

const initAdminRouter = (app) => {
    route.get('/login', loginController.viewLogin);
    route.post('/login', loginController.postLogin);

    route.get('/', isLogin, homeController.getHome);
    route.get('/user', isLogin, userController.getUser);
    route.get('/user/san-pham-da-mua/:idUser', isLogin, userController.detailProduct);
    route.get('/receipt-detail/:idReceipt', isLogin, userController.receiptDetail);
    route.get('/user/lockup/:idUser', isLogin, userController.lockup)
    route.get('/user/unlock/:idUser', isLogin, userController.unlock)

    route.get('/loai-san-pham', isLogin, lspController.getLsp)
    route.post('/loai-san-pham/create', isLogin, lspController.createLsp)
    route.post('/loai-san-pham/update/:idLsp', isLogin, lspController.updateLsp)
    route.post('/loai-san-pham/delete/:idLsp', isLogin, lspController.deleteLsp)
    route.get('/loai-san-pham/show/:idLsp', isLogin, lspController.show)
    route.get('/loai-san-pham/hidden/:idLsp', isLogin, lspController.hidden)

    route.get('/xuat-xu-san-pham', isLogin, xxController.getXx)
    route.post('/xuat-xu-san-pham/create', isLogin, xxController.createXx)
    route.post('/xuat-xu-san-pham/update/:idXx', isLogin, xxController.updateXx)
    route.post('/xuat-xu-san-pham/delete/:idXx', isLogin, xxController.deleteXx)
    route.get('/xuat-xu-san-pham/show/:idXx', isLogin, xxController.show)
    route.get('/xuat-xu-san-pham/hidden/:idXx', isLogin, xxController.hidden)

    route.get('/san-pham', isLogin, spController.getSp)
    route.post('/san-pham/create', isLogin, spController.createSp)
    route.post('/san-pham/update/:idSp', isLogin, spController.updateSp)
    route.post('/san-pham/delete/:idSp', isLogin, spController.deleteSp)
    route.get('/san-pham/show/:idSp', isLogin, spController.show)
    route.get('/san-pham/hidden/:idSp', isLogin, spController.hidden)

    route.get('/hoa-don', isLogin, hdController.getHd)
    route.get('/hoa-don/detail/:idhd', isLogin, hdController.detailHd)
    route.get('/hoa-don/nhan/:idhd', isLogin, hdController.nhanHd)
    route.get('/hoa-don/huy/:idhd', isLogin, hdController.huyHd)

    route.get('/thong-ke', isLogin, statisticalController.getStatis)
    route.get('/thong-ke/search', isLogin, statisticalController.search)

    return app.use('/admin/', route);
}

module.exports = initAdminRouter;