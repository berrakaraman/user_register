const express = require('express');
const user = require('./users');
const cars = require('./cars');


const router = express.Router();

router.use('/user', user);
router.use('/cars', cars);

module.exports = router;
