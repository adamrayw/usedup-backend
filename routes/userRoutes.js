const express = require('express');
const { userRegister, userLogin, updateUser, verification, sendEmailVerification } = require('../controllers/userControllers');

const router = express.Router()

router.post('/register', userRegister)
router.post('/login', userLogin)
router.post('/update', updateUser)
router.post('/verification?:id', verification)
router.post('/sendemailverif', sendEmailVerification)

module.exports = router