const router = require('express').Router();

router.use('/api', require('./api'));
router.use('/users', require('./users'));
router.use('/games', require('./games'));

module.exports = router;
