let router = require('express').Router();
let db = require('../config/db');
let _ = require('lodash');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
var name;
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './files/')
    },
    filename: function(req, file, callback) {
        console.log(file);
        console.log("Original name of the file is : "+file.originalname+"Time stamp -"+Date.now());
        callback(null, file.originalname);
        name = file.originalname;
    }
});
var upload = multer({ storage:storage });

router.post('/:email',upload.any(),function (req, res) {
       console.log("Required Email :"+req.params.email+Date.now()); // form field
    db.tables.Employees.findOne({
        where : {
            email:req.params.email
        }
    }).then(function (user) {
            db.tables.Files.create({
                name:name,
                id:user.get('id'),
                time_stamp:Date.now()
            }).then(function (data) {
                res.json({success:'File uploaded', files:req.files});
                console.log("File Added to Database");
            },function (error) {
                console.log("Unable to add file",error);
                res.status(400).json(error);
            });
        });
});

router.post('/manager/:email',upload.any(),function (req, res) {
    console.log("Required Email :"+req.params.email+Date.now()); // form field
    db.tables.Managers.findOne({
        where : {
            email:req.params.email
        }
    }).then(function (user) {
        db.tables.Files.create({
            name:name,
            id:user.get('id'),
            time_stamp:Date.now()
        }).then(function (data) {
            res.json({success:'File uploaded', files:req.files});
            console.log("File Added to Database");
        },function (error) {
            console.log("Unable to add file",error);
            res.status(400).json(error);
        });
    });
});

router.get('/read',function (req,res,next) {
    console.log("Reading Files");
    db.tables.Files.findAll({
    }).then(function (files) {
        res.json(files);
    },function (error) {
        res.status(400).json({Error:'Failed to fetch files'});
    })

});

router.get('/download/:fileid',function (req,res,next) {
    let file = './files/'+req.params.fileid;
    console.log(file+"This he file");
    res.download(file); // Set disposition and send it.

});


module.exports = router;

