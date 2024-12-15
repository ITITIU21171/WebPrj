const spDB = require('../../model/admin/spDB');
const path = require('path');
// const fileUpload = require('express-fileupload');
const fs = require('fs');

const layout = './admin/layoutAdmin';
let getSp = (req, res) => {
    spDB.getspDB(function (data) {
        data[0].forEach(element => {
            element.Image = Buffer.from(element.Image, 'base64');
            fs.writeFileSync(`${process.cwd()}/public/admin/image/${element.imgName}`, element.Image);
        });
        res.render('admin/SanPham.ejs', { layout: layout, dataSp: data[0], dataLsp: data[1], dataXx: data[2], SttSp: 0 });
        res.end();
    })
}

let show = (req, res) => {
    spDB.showDB(function(data){
        res.redirect('/admin/san-pham');
        res.end();
    }, req.params.idSp)
}

let hidden = (req, res) => {
    spDB.hiddenDB(function(data){
        res.redirect('/admin/san-pham');
        res.end();
    }, req.params.idSp)
}

let createSp = (req, res) => {
    let imageFile = req.files.fileImage;
    if( imageFile.size < 1048576 ){
        if (!fs.existsSync(`${process.cwd()}/public/admin/image/${req.files.fileImage.name}`)) {
            imageFile.mv(`${process.cwd()}/public/admin/image/${req.files.fileImage.name}`, err => {
                if (err) {
                    console.log(err);
                    return;
                }
                let imageAsBase64 = fs.readFileSync(`${process.cwd()}/public/admin/image/${req.files.fileImage.name}`, 'base64');
                let dataCreate = {
                    loaiSp: req.body.loaiSp,
                    imgName: imageFile.name,
                    image: imageAsBase64,
                    tenSp: req.body.tenSp,
                    giaNhap: req.body.giaNhap,
                    giaBan: req.body.giaBan,
                    soLuong: req.body.soLuong,
                    xuatXu: req.body.xuatXu,
                }

                spDB.createspDB(function (data) {
                    res.redirect('/admin/san-pham');
                    res.end();
                }, dataCreate);

            })

        } else {
            res.send("Duplicate photo name");
            res.end();
        }
    }else{
        res.send("Photo size must not exceed 1mb");
        res.end();
    }
}

let updateSp = (req, res) => {

    if (!req.files) {
        let dataUpdate = {
            loaiSp: req.body.loaiSp,
            tenSp: req.body.tenSp,
            giaNhap: req.body.giaNhap,
            giaBan: req.body.giaBan,
            soLuong: req.body.soLuong,
            xuatXu: req.body.xuatXu,
        }
        spDB.updatespDB(function (data) {
            res.redirect('/admin/san-pham');
            res.end();
        }, dataUpdate, req.params.idSp);
    } else {
        let imageFile = req.files.fileImage;
        if( imageFile.size < 1048576 ){
            if (!fs.existsSync(`${process.cwd()}/public/admin/image/${req.files.fileImage.name}`)) {
                imageFile.mv(`${process.cwd()}/public/admin/image/${req.files.fileImage.name}`, err => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    fs.unlink(`${process.cwd()}/public/admin/image/${req.body.imgName}`, err => {
                        if (err){
                            throw err;
                        }
                        let imageAsBase64 = fs.readFileSync(`${process.cwd()}/public/admin/image/${req.files.fileImage.name}`, 'base64');
                        let dataUpdate = {
                            loaiSp: req.body.loaiSp,
                            imgName: imageFile.name,
                            image: imageAsBase64,
                            tenSp: req.body.tenSp,
                            giaNhap: req.body.giaNhap,
                            giaBan: req.body.giaBan,
                            soLuong: req.body.soLuong,
                            xuatXu: req.body.xuatXu,
                        }
                        spDB.updatespDB(function (data) {
                            res.redirect('/admin/san-pham');
                            res.end();
                        }, dataUpdate, req.params.idSp);
                    })
                    
                })
            }else {
                res.send("Duplicate photo name");
                res.end();
            }
        }else{
            res.send("Photo size must not exceed 1mb");
            res.end();
        }
    }
}


let deleteSp = (req, res) => {
    fs.unlink(`${process.cwd()}/public/admin/image/${req.body.imgName}`, err => {
        if (err){
            throw err;
        }
        spDB.deletespDB(function (data) {
            res.redirect('/admin/san-pham');
            res.end();
        }, req.params.idSp)
    })
}

module.exports = {
    getSp, createSp, updateSp, deleteSp, show, hidden
}

