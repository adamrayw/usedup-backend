const express = require("express");
const { mobilBekas } = require('../contollers/formControllers');
const router = express.Router()

router.post('/mobil-bekas', mobilBekas)

module.exports = router
