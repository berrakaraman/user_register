const express = require('express');
const router = express.Router();
const users = require('../controllers/users')
const carsList = require('../controllers/carsList')
const {tokenControl} = require('../middleware/tokenControl');
const { roleControl } = require('../middleware/roleControl');



router.post('/login', users.login)
router.post('/register', users.register)
router.post('/usersList', tokenControl,users.usersList)
router.post('/admin', tokenControl, roleControl, users.admin)
router.post('/update',users.updatee)
router.delete('/delete',users.deletee)
router.post('/car',tokenControl, roleControl, carsList.carsAdd)
router.post('/carList', carsList.carsList)
router.post('/carUpdate', carsList.carsUpdate)
router.post('/carDelete', carsList.carsDelete)
module.exports=router