const express = require('express');
const { get, getStatusInfo } = require('../controllers/goods.controller');

const router = express.Router();

router
  .get('/status-info', getStatusInfo)
  .get('/', get)

  

module.exports = router;