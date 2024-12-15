const loginDB = require('../../model/admin/loginDB');

let viewLogin = (req, res) => {
    req.session.isLoginAdmin = false;
    res.render('admin/loginAdmin.ejs', {layout: 'admin/loginAdmin.ejs', dataLogin: ''});
}

let postLogin = (req, res) => {
    
    loginDB.selectLogin(function(data){
        if(!data[0]){
            res.render('admin/loginAdmin.ejs', {dataLogin: 'Wrong username or password'});
            res.end();
        }
        else{
            req.session.isLoginAdmin = true;
            res.redirect('/admin');
            res.end();
        }
    }, req.body.taiKhoan, req.body.password);
}

module.exports = {viewLogin, postLogin};