const sanphamDB = require('../../model/customer/sanphamDB');
const headerDB = require('../../model/customer/headerDB');

const layout = './customer/layoutCustomer';
let header

var formatVnd = (number) => {
    return String(number).replace(/(.)(?=(\d{3})+$)/g,'$1,');
}

let getLoaisanPham = (req, res) => {
    headerDB.getHeader((data) => {
    header = data
})
    sanphamDB.getLoaiSanPham((data) => {
        res.render('customer/sanpham.ejs', {layout: layout, number_format: formatVnd, dataLsp: data, dataXx: false, sessionID: req.cookies.dataLogin, dataHeaderSp: header[0], dataHeaderXx: header[1]});
        res.end();
    }, req.params.idLsp);
}

let getXuatxu = (req, res) => {
    headerDB.getHeader((data) => {
    header = data
})
    sanphamDB.getXuatXu((data) => {
        res.render('customer/sanpham.ejs', {layout: layout, number_format: formatVnd, dataXx: data, dataLsp: false, sessionID: req.cookies.dataLogin, dataHeaderSp: header[0], dataHeaderXx: header[1]});
        res.end();
    }, req.params.idXx);
}

let getDetail = (req, res) => {
    headerDB.getHeader((data) => {
    header = data
})
    sanphamDB.getDetail((data) => {
        res.render('customer/detailSp.ejs', {layout: layout, number_format: formatVnd, sessionID: req.cookies.dataLogin, dataHeaderSp: header[0], dataHeaderXx: header[1], dataDetailSp: data[0], dataSameSp: data[1]});
        res.end();
    }, req.params.idSP, req.params.idLsp)
}

let searchSanPham = (req, res) => {
    headerDB.getHeader((data) => {
    header = data
})
    sanphamDB.searchSanPham((data) => {
        res.render('customer/search.ejs', {layout: layout, number_format: formatVnd, dataSp: data, title: req.body.search,sessionID: req.cookies.dataLogin, dataHeaderSp: header[0], dataHeaderXx: header[1]});
        res.end();
    }, req.body.search);
}

let addToCart = (req, res) => {
    if(!req.cookies.dataLogin){
        res.redirect('/customer/login');
        res.end();
    }else{
        sanphamDB.addToCart((data) => {
            res.redirect('/customer/san-pham/chi-tiet/' + req.body.idLsp +'/'+ req.body.idSp);
            res.end();
        }, req.body, req.cookies.dataLogin.ID);
    }
}

let getCart = (req, res) => {
    headerDB.getHeader((data) => {
    header = data
})
    sanphamDB.getCart((data) => {
        res.render('customer/cart.ejs', {layout: layout, number_format: formatVnd, dataCart: data, sessionID: req.cookies.dataLogin, dataHeaderSp: header[0], dataHeaderXx: header[1]});
        res.end();
    }, req.cookies.dataLogin.ID);
}

let updateCart = (req, res) => {
    sanphamDB.updateCart((data) => {
        res.redirect('/customer/cart');
        res.end();
    }, req.cookies.dataLogin.ID, req.body)
}

let deleteCart = (req, res) => {
    sanphamDB.deleteCart((data) => {
        res.redirect('/customer/cart');
        res.end();
    }, req.body)
}

let orderCart = (req, res) => {
    sanphamDB.orderCart((data) => {
        res.redirect('/customer/home');
        res.end();
    }, req.body, req.cookies.dataLogin.ID)
}

let donHang = (req, res) => {
    headerDB.getHeader((data) => {
    header = data
})
    sanphamDB.donHang((data) => {
        res.render('customer/donHangHienCo.ejs', {layout: layout, dataDonHang: data, number_format: formatVnd, sessionID: req.cookies.dataLogin, dataHeaderSp: header[0], dataHeaderXx: header[1]})
        res.end();
    }, req.cookies.dataLogin.ID)
}

let chiTietDonHang = (req, res) => {
    headerDB.getHeader((data) => {
    header = data
})
    sanphamDB.chiTietDonHang((data) => {
        res.render('customer/chiTietDonHang.ejs', {layout: layout, dataDonHang: data[0], dataChiTietDonHang: data[1], number_format: formatVnd, sessionID: req.cookies.dataLogin, dataHeaderSp: header[0], dataHeaderXx: header[1]})
        res.end();
    }, req.params.idDh)
}

let lichSuDonHang = (req, res) => {
    headerDB.getHeader((data) => {
    header = data
})
    sanphamDB.lichSuDonHang((data) => {
        res.render('customer/lichSuDatHang.ejs', {layout: layout, dataDonHang: data, number_format: formatVnd, sessionID: req.cookies.dataLogin, dataHeaderSp: header[0], dataHeaderXx: header[1]})
        res.end();
    }, req.cookies.dataLogin.ID)
}

let huyDonHang = (req, res) => {
    sanphamDB.huyDonHang(function(data){
        res.redirect('/customer/don-hang');
        res.end();
    }, req.params.idDh)
}

module.exports = {
    getDetail, getLoaisanPham, getXuatxu, searchSanPham, addToCart, getCart, updateCart,
    deleteCart, orderCart, donHang, chiTietDonHang, lichSuDonHang, huyDonHang
}