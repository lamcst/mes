const express = require('express');
const { get } = require('../controllers/good-templates.controller');

const router = express.Router();

router.get('/', get)
  

module.exports = router;