const express = require("express");
const { mobilBekas, provinsiData } = require('../contollers/formControllers');
const router = express.Router()

router.post('/mobil-bekas', mobilBekas)
router.get('/provinsi', provinsiData)

module.exports = router
