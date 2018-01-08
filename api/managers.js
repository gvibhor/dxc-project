let router = require('express').Router();
let db = require('../config/db');
let _ = require('lodash');

router.post('/register',function (req, res, next) {
    let body = _.pick(req.body,'name','email','phone','password');
    db.tables.Managers.create({
      name:_.result(body,'name'),
      phone_no:_.result(body,'phone'),
      email:_.result(body,'email'),
      password:_.result(body,'password')
    }).then(function (data) {
        res.json(data);
    },function (error) {
        res.status(400).json(error);
    })
});

router.post('/login',function (req, res, next) {
    let body = _.pick(req.body,'email','password');
    db.tables.Managers.findOne({
        where:{
            email:_.result(body,'email'),
            password:_.result(body,'password')
        }
    }).then(function (success) {
        if(success){
            res.json({
                Success:'Login successful',
                Details: success.get('name')
            });
        }else {
            res.status(401).json({Invalid_Details:'Email or password wrong'})
        }
    },function (error) {
        res.json(error);
    })

});

module.exports = router;