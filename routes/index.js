const express = require('express');
const user = require('./users');


const router = express.Router();

router.use('/user', user);

module.exports = router;
