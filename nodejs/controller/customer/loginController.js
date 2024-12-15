const session = require('express-session');
const loginDB = require('../../model/customer/loginDB');

let viewLogin = (req, res) => {
    res.clearCookie('dataLogin');
    res.render('customer/loginCustomer.ejs', {layout: 'customer/loginCustomer.ejs', dataLogin: ''});
}

let postLogin = (req, res) => {
    loginDB.selectLogin(function(data){
        if(!data[0]){
            res.render('customer/loginCustomer.ejs', {layout: 'customer/loginCustomer.ejs', dataLogin: 'Wrong user name or password'});
            res.end();
        }
        else{

            res.cookie('dataLogin', data[0], {
                httpOnly: true,
                
            });
            res.redirect('/customer/home');
            res.end();
        }
    }, req.body.taiKhoan, req.body.password);
}

let viewSignup = (req, res) => {
    req.session.isLogin = false;
    res.clearCookie('dataLogin');
    res.render('customer/signUpCustomer.ejs', {layout: 'customer/signUpCustomer.ejs', dataLogin: ''});
}

let postSignup = (req, res) => {
    if(req.body.usename == ''){
        res.render('customer/signUpCustomer.ejs', {layout: 'customer/signUpCustomer.ejs', dataLogin: 'Username cannot empty'});
        res.end();
    }
    if(req.body.password == ''){
        res.render('customer/signUpCustomer.ejs', {layout: 'customer/signUpCustomer.ejs', dataLogin: 'Password cannot empty'});
        res.end();
    }
    if(req.body.password != req.body.password_repeat){
        res.render('customer/signUpCustomer.ejs', {layout: 'customer/signUpCustomer.ejs', dataLogin: 'Not match'});
        res.end();
    }
    if(req.body.checkboxx != 'yes'){
        res.render('customer/signUpCustomer.ejs', {layout: 'customer/signUpCustomer.ejs', dataLogin: 'agree with the term to continue'});
        res.end();
    }
    if(req.body.usename != '' && req.body.password != '' && (req.body.password == req.body.password_repeat) && req.body.checkboxx == 'yes'){
        loginDB.postSignUp(function(data){
            res.redirect('/customer/login');
            res.end();
        }, req.body.usename, req.body.password);
    }
}

let changePass = (req, res) => {
    res.render('customer/changePass.ejs', {layout: 'customer/changePass.ejs'});
    res.end();
}

let postChangePass = (req, res) => {
    loginDB.isPass((data) => {
        if (!data[0]){
            res.send('Wrong password');
            res.end();
        }else{
            const pass = req.body.password;
            const pass_repeat = req.body.password_repeat;
            if (pass != pass_repeat){
                res.send('New password no match');
                res.end();
            }else{
                loginDB.postChangePass((dataChange) => {
                    res.redirect('/customer/login');
                    res.end();
                }, pass, req.session.IDTK)
            }
        }
    }, req.session.IDTK, req.body.password_old)

}

module.exports = {viewLogin, postLogin, viewSignup, postSignup, changePass, postChangePass};