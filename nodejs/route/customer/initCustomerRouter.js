const express = require('express')
const loginController = require('../../controller/customer/loginController');
const homeController = require('../../controller/customer/homeController');
const sanphamController = require('../../controller/customer/sanphamController');

const route = express.Router()

function isLogin(req, res, next){
    if (req.cookies.dataLogin){
        next();
    }else{
        res.redirect('/customer/login');
    }
}

const initCustomerRouter = (app) => {
    route.get('/login', loginController.viewLogin);
    route.post('/login', loginController.postLogin);

    route.get('/signup', loginController.viewSignup);
    route.post('/signup', loginController.postSignup);

    route.get('/changePass', loginController.changePass);
    route.post('/changePass', loginController.postChangePass);

    route.get('/home', homeController.getHome);

    route.get('/san-pham/loai-san-pham/:idLsp', sanphamController.getLoaisanPham);
    route.get('/san-pham/xuat-xu/:idXx', sanphamController.getXuatxu);
    route.get('/san-pham/chi-tiet/:idLsp/:idSP', sanphamController.getDetail);
    route.post('/san-pham/search/', sanphamController.searchSanPham);
    route.post('/san-pham/add-to-cart', sanphamController.addToCart);

    route.get('/cart', isLogin, sanphamController.getCart);
    route.post('/cart/update', isLogin, sanphamController.updateCart);
    route.post('/cart/delete', isLogin, sanphamController.deleteCart);
    route.post('/cart/order', isLogin, sanphamController.orderCart);

    route.get('/don-hang', isLogin, sanphamController.donHang);
    route.get('/don-hang/chi-tiet/:idDh', isLogin, sanphamController.chiTietDonHang);
    route.get('/don-hang/huy/:idDh', isLogin, sanphamController.huyDonHang);
    route.get('/don-hang/lich-su/', isLogin, sanphamController.lichSuDonHang);

    return app.use('/customer/', route);
}

module.exports = initCustomerRouter;