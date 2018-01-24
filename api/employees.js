let router = require('express').Router();
let db = require('../config/db');
let _ = require('lodash');
let express = require('express');
let app = express();
let path = require('path');
let viewPath = path.join(__dirname, 'public/views');

router.post('/register/:memail',function (req, res, next) {
    console.log("Employee Register Block");
    let body = _.pick(req.body,'name','email','phone_no','manager_id','read_access','write_access');

    db.tables.Managers.findOne({
        attributes:['id'],
        where : {
            email : req.params.memail
        }

    }).then(function (user) {
        var userid = user.id;

console.log("Manager id"+req.params.memail);
        db.tables.Employees.create({
            // id:_.result(body,'id'),
            name:_.result(body,'name'),
            email:_.result(body,'email'),
            phone_no:_.result(body,'phone_no'),
            // manager_id:_.result(body,'manager_id'),
            manager_id:userid,
            read_access:_.result(body,'read_access'),
            write_access:_.result(body,'write_access')
        }).then(function (data) {
            console.log("Employee Created");
            res.json(data);
        },function (error) {
            console.log("Unable to Create "+req.body.read_access+" "+req.body.write_access);
            res.status(400).json(error);
        })
    });
    });


// router.get('/',function (req, res, next) {
//     db.tables.Employees.findAll({
//
//     }).then(function (data) {
//         res.json(data);
//     },function (error) {
//         res.json(error);
//     })
// });

router.post('/login',function (req, res, next)
{
    let body = _.pick(req.body,'email','phone_no');
    console.log(body);
    db.tables.Employees.findOne({
        where:{
            email:_.result(body,'email'),
            phone_no:_.result(body,'phone_no')
        }
    }).then(function (success)
    {
        if(success){
            console.log("Employee Lgin Successful");
             //res.render("insideWrite/",{});
              res.send("Hello");
            // res.redirect('/dashboard1');
        }else {
            console.log("Invalid one");
            res.status(401).json({Invalid_Details:'Email or password wrong'});

        }
    },function (error) {
        res.json(error);
    })

});

module.exports = router;