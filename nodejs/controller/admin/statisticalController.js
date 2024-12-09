const statisticalDB = require('../../model/admin/statisticalDB');

const layout = './admin/layoutAdmin';
let getStatis = (req, res) => {
    statisticalDB.ThongKeTrongNgay(function(data) {
        res.render('admin/statistical.ejs', {layout: layout, dataStatis: data, Stt: 0});
        res.end();
    })
}

let search = (req, res) => {
    statisticalDB.ThongKeSearch(function(data) {
        res.render('admin/statisticalSearch.ejs', {layout: layout, dataStatis: data, dateStart: req.query.dateStart, dateEnd: req.query.dateEnd, Stt: 0});
        res.end();
    }, req.query.dateStart, req.query.dateEnd)
}

module.exports = {
    getStatis, search
}