let router = require('express').Router();
router.get('/',function (req, res, next) {
   res.json('API Link');
});
router.use('/managers',require('./managers'));
router.use('/employees',require('./employees'));

module.exports = router;

