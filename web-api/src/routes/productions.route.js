const express = require('express');
const { 
  get, getSingle, post, postStatus, postGood, del ,
  getStatusDuration, getProdOutput
} = require('../controllers/productions.controller');

const router = express.Router();


router
  .get('/status-duration', getStatusDuration)
  .get('/good-output', getProdOutput)
  .get('/:uuid', getSingle)
  .get('/', get)
  .post('/', post)
  .post('/status', postStatus)
  .post('/good', postGood)
  .delete('/:uuid', del)


module.exports = router;