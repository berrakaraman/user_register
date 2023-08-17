const express = require('express');
const router = express.Router();
const {tokenControl} = require('../middleware/tokenControl');
const { roleControl } = require('../middleware/roleControl');
const cars = require('../controllers/cars');
const carSevice = require('../services/cars');

router.post('/carAdd',tokenControl, roleControl, cars.carsAdd, carSevice.carsAdd);
router.post('/carList', carSevice.carsList);
router.post('/carUpdate', cars.carsUpdate,carSevice.carsUpdate);
router.delete('/carDelete', cars.carsDelete, carSevice.carsDelete);

module.exports=router; //dışarı dosya alıp vermek için lazım