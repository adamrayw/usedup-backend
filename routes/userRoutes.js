const express = require('express');
const { userRegister, userLogin, updateUser, verification, sendEmailVerification, forgotPassword, resetPassword, resetPasswordPost } = require('../controllers/userControllers');
const { validateToken } = require("../middleware/validateToken");
const router = express.Router()

router.post('/register', userRegister)
router.post('/login', userLogin)
router.post('/update', validateToken, updateUser)
router.post('/verification?:id', verification)
router.post('/sendemailverif', sendEmailVerification)
router.post('/forgotpassword', forgotPassword)
router.post('/resetpassword', resetPassword)
router.post('/resetpasswordpost', resetPasswordPost)

module.exports = router