const express = require('express')
const router = express.Router();
const {RegisterUser, Login} = require('../controllers/Login')

router.route('/register').post(RegisterUser)
router.route('/login').post(Login)

module.exports = router