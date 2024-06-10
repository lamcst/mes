const express = require('express');
const { get, post, getSingle, postStatus, postResult } = require('../controllers/quality-controls.controller');

const router = express.Router();

router
  .get('/:uuid', getSingle)
  .get('/', get)
  .post('/', post)
  .post('/status', postStatus)
  .post('/result', postResult)


module.exports = router;