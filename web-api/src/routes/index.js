const express = require('express');
const materialRoutes = require('./materials.route')
const productionRoutes = require('./productions.route')
const goodTemplateRoutes = require('./good-templates.route')
const qualityControlRoutes = require('./quality-controls.route')
const goodsRoutes = require('./goods.route')
const router = express.Router();

router.use('/materials', materialRoutes);
router.use('/productions', productionRoutes);
router.use('/good-templates', goodTemplateRoutes);
router.use('/quality-controls', qualityControlRoutes);
router.use('/goods', goodsRoutes)

module.exports = router;