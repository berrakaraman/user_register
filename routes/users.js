const express = require('express');
const router = express.Router();
const users = require('../controllers/users')

const {tokenControl} = require('../middleware/tokenControl');
const { roleControl } = require('../middleware/roleControl');



router.post('/login', users.login)
router.post('/register', users.register)
router.post('/usersList', tokenControl,users.usersList)
router.post('/admin', tokenControl, roleControl, users.admin)
router.post('/update',users.updatee)
router.delete('/delete',users.deletee)

module.exports=router