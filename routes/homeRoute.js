const express = require('express');
const { home, view, kategori, kategoriItems, deleteData, favorit, tambahFavorit, hapusFavorit } = require('../contollers/homeControllers');
const router = express.Router()

router.get('/home?:result', home)
router.get('/kategori', kategori)
router.get('/:id', view)
router.get('/kategori/:slug', kategoriItems)
router.delete('/delete', deleteData)
router.get('/get/favorite', favorit)
router.post('/tambah/favorite', tambahFavorit)
router.delete('/hapus/favorite', hapusFavorit)

module.exports = router