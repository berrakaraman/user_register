const express = require('express');

const router = express.Router();

const users = require('../controllers/users');
const user = require('../services/user');

const {tokenControl} = require('../middleware/tokenControl');
const { roleControl } = require('../middleware/roleControl');



router.post('/login', users.login, user.login);
router.post('/register', users.register, user.register);
router.post('/usersList', tokenControl,user.usersList);
router.post('/admin', tokenControl, roleControl, user.admin);
router.post('/update',users.updatee, user.updatee);
router.delete('/delete',users.deletee, user.deletee);

module.exports=router;