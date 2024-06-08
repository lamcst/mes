const express = require('express');
const { get } = require('../controllers/materials.controller');

const router = express.Router();

router.get('/', get)

module.exports = router;