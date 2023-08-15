const express = require('express');
const router = express.Router();
const users = require('../controllers/users')
const {tokenControl} = require('../middleware/tokenControl');
const { roleControl } = require('../middleware/roleControl');


router.post('/login', users.login)
router.post('/register', users.register)
router.post('/usersList', tokenControl,users.usersList)
router.post('/admin', tokenControl, roleControl, users.admin)
module.exports=router