const express = require('express');
const { home, view } = require('../contollers/homeControllers');
const router = express.Router()

router.get('/home', home)
router.get('/:id', view)

module.exports = router