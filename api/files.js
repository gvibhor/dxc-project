let router = require('express').Router();
let db = require('../config/db');
let _ = require('lodash');
const multer = require('multer');

router.get('/',(req,res,next)=>{
    res.send('all files');
});

// router.post('/',[ multer({ dest: '../files'}),(req,res,next)=>{
//     console.log(req.body); // form fields
//     console.log(req.files); // form files
//     res.status(204).end()
// }]);






module.exports = router;

