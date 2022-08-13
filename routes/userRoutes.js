const { application } = require('express');
const express = require('express');
const { userRegister } = require('../contollers/userControllers');


const router = express.Router()

router.post('/register', userRegister)
router.get('/login')

module.exports = router