const { application } = require('express');
const express = require('express');
const { userRegister, userLogin, updateUser } = require('../contollers/userControllers');


const router = express.Router()

router.post('/register', userRegister)
router.post('/login', userLogin)
router.post('/update', updateUser)

module.exports = router