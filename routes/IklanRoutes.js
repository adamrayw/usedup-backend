const express = require('express');
const { hapusIklan } = require('../controllers/IklanController');

const router = express.Router()

router.post("/iklan/hapus", hapusIklan)

module.exports = router