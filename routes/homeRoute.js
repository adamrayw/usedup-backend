const express = require('express');
const { home, view, kategori, kategoriItems } = require('../contollers/homeControllers');
const router = express.Router()

router.get('/home', home)
router.get('/kategori', kategori)
router.get('/:id', view)
router.get('/kategori/:slug', kategoriItems)

module.exports = router