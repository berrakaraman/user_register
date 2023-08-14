const express = require('express');
const router = express.Router();
const users = require('../controllers/users')
const {tokenControl} = require('../middleware/tokenControl')


router.post('/login', users.login)
router.post('/register', users.register)
router.post('/usersList', tokenControl,users.usersList)
module.exports=router