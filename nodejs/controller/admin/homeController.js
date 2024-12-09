const homeDB = require('../../model/admin/homeDB');

const layout = './admin/layoutAdmin';
let getHome = (req, res) => {
    homeDB.ThongKeTrongNgay(function(data) {
            res.render('admin/homeAdmin.ejs', {layout: layout, dataHome: data});
            res.end();

    })
}

module.exports = {
    getHome
}