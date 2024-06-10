const QcStatuses = require("../models/qc-statuses.models");
const QualityControls = require("../models/quality-controls.models");
const GoodTestResults = require("../models/good-test-results.models")
const slug = require('slug');
const Goods = require("../models/goods.models");
const QcGoods = require('../models/qc-goods.models')
/**
 * @param { import("express").Request } req
 * @param { import("express").Response } res
 * @param { import("express").NextFunction } next
 * @returns { Promise<void> }
 */
exports.postResult = async (req, res, next) => {
  let { goodId, testResults } = req.body
  const passes = []
  const inputs = testResults.map((tr) => {
    const { templateId, result, pass } = tr
    passes.push(pass)
    return {
      good_id: goodId,
      good_template_test_id: templateId,
      result,
      pass
    }
  })
  let checker = arr => arr.every(Boolean);
  const status = checker(passes) ? 'qc-ed' : 'defect'
  try {
    await GoodTestResults.transaction(async (trx) => {
      
      await Goods.query().where('id', goodId).update({status})
      await GoodTestResults.query(trx).where('good_id', goodId).del()
      await GoodTestResults.query(trx).insert(inputs)

    })
    res.json({ message: 'success' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}
/**
 * @param { import("express").Request } req
 * @param { import("express").Response } res
 * @param { import("express").NextFunction } next
 * @returns { Promise<void> }
 */
exports.postStatus = async (req, res, next) => {

  let { qcId, status, start } = req.body;
  try {
    if (!start) {
      start = new Date().toISOString()
    }
    const [qcStatus] = await QcStatuses.query().orderBy('start', 'DESC').limit(1)

    if (qcStatus && qcStatus.status === status) {
      res.json({ message: 'duplicate' })
      return
    }
    await QcStatuses.query().insert({
      qc_id:qcId, status, start
    })
    res.json({ message: 'success' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}

/**
 * @param { import("express").Request } req
 * @param { import("express").Response } res
 * @param { import("express").NextFunction } next
 * @returns { Promise<void> }
 */
exports.getSingle = async (req, res, next) => {
  const { uuid } = req.params
  try {

    const result = await QualityControls.query()
      .findOne('id', uuid)
      .withGraphFetched('[statuses, goods.[testResults.[template],template.[tests]]]')


    res.json(result)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}
/**
 * @param { import("express").Request } req
 * @param { import("express").Response } res
 * @param { import("express").NextFunction } next
 * @returns { Promise<void> }
 */
exports.post = async (req, res, next) => {
  const { description, name, expectEnd, goods } = req.body
  const slugInput = slug(name)

  try {
    await QualityControls.transaction(async (trx) => {
      const qc = await QualityControls.query(trx).insert({
        name,
        code_name: slugInput,
        description,
        expect_end: expectEnd,
      }).returning('*')
      const qcGoods = goods.map(g => {
        return { good_id: g.id, qc_id: qc.id }
      })
      await QcGoods.query(trx).insert(qcGoods)
      res.json({ message: 'success' })
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
/**
 * @param { import("express").Request } req
 * @param { import("express").Response } res
 * @param { import("express").NextFunction } next
 * @returns { Promise<void> }
 */
exports.get = async (req, res, next) => {
  const { page, pageSize } = req.query

  const prodQuery = QualityControls.query().orderBy('created_at', 'DESC')
  const [countResult] = await QualityControls.query().count()
  if (page && pageSize) {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    prodQuery.limit(limit).offset(offset)
  }
  try {

    const data = await prodQuery
    let count = undefined
    let lastPage = undefined
    if (page && pageSize) {

      let { count: innerCount = 0 } = countResult || {}
      innerCount = Number(innerCount)

      lastPage = Math.ceil(innerCount / pageSize)
      count = innerCount

    }
    res.json({ data, count, lastPage })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }


}
