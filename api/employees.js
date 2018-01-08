let router = require('express').Router();
let db = require('../config/db');


router.get('/',function (req, res, next) {
    db.tables.Employees.findAll({

    }).then(function (data) {
        res.json(data);
    },function (error) {
        res.json(error);
    })
});

module.exports = router;