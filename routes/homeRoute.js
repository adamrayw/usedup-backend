const express = require('express');
const { home, view, kategori, kategoriItems, deleteData, favorit } = require('../contollers/homeControllers');
const router = express.Router()

router.get('/home?:result', home)
router.get('/kategori', kategori)
router.get('/:id', view)
router.get('/kategori/:slug', kategoriItems)
router.delete('/delete', deleteData)
router.get('/get/favorite', favorit)

module.exports = router