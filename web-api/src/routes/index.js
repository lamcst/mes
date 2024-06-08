const express = require('express');
const materialRoutes = require('./materials.route')
const router = express.Router();

router.use('/materials', materialRoutes);

module.exports = router;