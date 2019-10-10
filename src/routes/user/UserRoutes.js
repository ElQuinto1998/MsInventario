const express = require('express');
const router = express.Router();

const controller = require('../../controller/user/UserController');
const auth = require('../../middlewares/auth');

router.post('/login', controller.login);
router.post('/register', controller.register);

module.exports = router;
