const express = require("express");
const { mobilBekas, provinsiData } = require('../controllers/formControllers');
const { validateToken } = require("../middleware/validateToken");
const router = express.Router()

router.post('/mobil-bekas', validateToken, mobilBekas)
router.get('/provinsi', provinsiData)

module.exports = router
