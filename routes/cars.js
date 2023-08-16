const express = require('express');
const router = express.Router();
const {tokenControl} = require('../middleware/tokenControl');
const { roleControl } = require('../middleware/roleControl');
const cars = require('../controllers/cars')

router.post('/carAdd',tokenControl, roleControl, cars.carsAdd)
router.post('/carList', cars.carsList)
router.post('/carUpdate', cars.carsUpdate)
router.post('/carDelete', cars.carsDelete)

module.exports=router //dışarı dosya alıp vermek için lazım