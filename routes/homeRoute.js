const express = require('express');
const { home, view, kategori, kategoriItems, deleteData, favorit, tambahFavorit, hapusFavorit, search, updateDilihat, iklanSaya } = require('../controllers/homeControllers');
const { validateToken } = require("../middleware/validateToken");
const router = express.Router()

router.get('/home?:result', home)
router.get('/kategori', kategori)
router.get('/:id', view)
router.get('/kategori/:slug', kategoriItems)
router.delete('/delete', deleteData)
router.get('/get/favorite?:id', validateToken, favorit)
router.post('/tambah/favorite', tambahFavorit)
router.delete('/hapus/favorite', hapusFavorit)
router.get('/item/search?:keyword', search)
router.post('/dilihat/:id', updateDilihat)
router.get('/iklan-saya/:id', iklanSaya)

module.exports = router