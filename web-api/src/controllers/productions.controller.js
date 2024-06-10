const MaterialItems = require("../models/materials-items.models");
const Productions = require("../models/productions.models");
const slug = require('slug')
const { transaction } = require('objection');
const _ = require('lodash');
const { v5 } = require("uuid");
const ProdMaterialItems = require("../models/prod-materials-items.models");
const ProdStatuses = require("../models/prod-statuses.models");
const ProdGoodTemplates = require("../models/prod-good-templates.models");
const Goods = require("../models/goods.models");
const GoodMaterialItems = require("../models/good-material-items.models");
const moment = require("moment")

/**
 * @param { import("express").Request } req
 * @param { import("express").Response } res
 * @param { import("express").NextFunction } next
 * @returns { Promise<void> }
 */
exports.getProdOutput = async (req, res, next) => {

  try {
    const prods =await Productions.query()
      .withGraphFetched('goods.[template]');
    prods.forEach(prod=>{
      const goodTemplateUsed = prod.goods.reduce((result, good) => {
        if (result[good.goodTemplateId]) {
          result[good.goodTemplateId].number++
          return result
        }
        return {
          ...result,
          [good.goodTemplateId]: {
            number: 1,
            ...good.template,
          }
        }
      }, {})
      prod.goods = Object.values(goodTemplateUsed)
    })
    
    res.json(prods)
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
exports.getStatusDuration = async (req, res, next) => {
  try {
    const result = await ProdStatuses.query().select('status').sum('duration').groupBy('status');
    res.json(result)
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
exports.del = async (req, res, next) => {
  const { uuid } = req.params
  const [goodCountResult] = await Goods.query().count().where('prod_id', uuid)
  const { count } = goodCountResult || {}
  if (Number(count)) {
    res.status(400).json({ message: "not able delete due to production has products added" })
    return
  }
  try {
    await Productions.transaction(async (trx) => {
      await ProdGoodTemplates.query().where('prod_id', uuid).del()
      await ProdStatuses.query().where('prod_id', uuid).del()
      await ProdMaterialItems.query().where('prod_id', uuid).del()
      await Productions.query().where('id', uuid).del()
    })
    res.json({ message: 'success' })
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
exports.postGood = async (req, res, next) => {
  const { prodId, goodTemplateId, materials, status = 'produced' } = req.body;

  try {
    await Goods.transaction(async (trx) => {
      const good = await Goods.query(trx).insert({
        prod_id: prodId,
        good_template_id: goodTemplateId,
        status,
      }).returning('*')
      const matItemQueries = materials.map(material => {
        const { id, number } = material;
        return MaterialItems.query(trx)
          .select('material_items.id')
          .leftJoinRelated('good')
          .whereNull('good.good_id')
          .innerJoinRelated('prod')
          .where('prod.prod_id', prodId)
          .where('material_id', id)
          .limit(number)
      })

      const results = await Promise.all(matItemQueries)
      const materialItems = _.flatten(results).map(item => {
        return { good_id: good.id, material_item_id: item.id }
      });
      if (!materialItems.length) {
        throw new Error('no enough materials')
      }

      await GoodMaterialItems.query(trx).insert(materialItems)
      return
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
  let { prodId, status, start } = req.body;
  try {
    if (!start) {
      start = new Date().toISOString()
    }
    const [prodStatus] = await ProdStatuses.query()
      .where('prod_id',prodId).orderBy('start', 'DESC').limit(1)

    if (prodStatus && prodStatus.status === status) {
      res.json({ message: 'duplicate' })
      return
    }
    await ProdStatuses.transaction(async (trx) => {
      if (prodStatus) {
        const { start: prevStart, id } = prodStatus
        const duration = moment(start).unix() - moment(prevStart).unix()
        await ProdStatuses.query(trx).update({
          duration
        }).where('id', id)
      }
      const proStatus = await ProdStatuses.query(trx).insert({
        prodId, status, start,
      }).returning('*')
      req.io.emit("new-status", { proStatus });
      res.json({ message: 'success' })
    })

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
  try {
    const { description, name, materials, expectEnd, goodTemplates } = req.body;
    const slugInput = slug(name)

    const matItemQueries = materials.map(material => {
      const { id, number } = material;
      return MaterialItems.query().select('id').where('material_id', id).limit(number)
    })

    const results = await Promise.all(matItemQueries)
    const id = v5(slugInput, Productions.namespace)
    const materialItems = _.flatten(results).map(item => {
      return { prod_id: id, material_item_id: item.id }
    });

    await Productions.transaction(async (trx) => {

      await Productions.query(trx).insert({
        id,
        slug: slugInput,
        name,
        description,
        expect_end: expectEnd,
      })
      await ProdGoodTemplates.query(trx).insert(goodTemplates.map((gt) => {
        const { number } = gt;
        return { good_template_id: gt.id, prod_id: id, number }
      }))
      await ProdMaterialItems.query(trx).insert(materialItems)

      return
    })

    res.json({ success: true })
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
exports.get = async (req, res, next) => {
  const { page, pageSize } = req.query

  const prodQuery = Productions.query().orderBy('created_at', 'DESC')
  const [countResult] = await Productions.query().count()
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

/**
 * @param { import("express").Request } req
 * @param { import("express").Response } res
 * @param { import("express").NextFunction } next
 * @returns { Promise<void> }
 */
exports.getSingle = async (req, res, next) => {
  const { uuid } = req.params
  const product = await Productions.query()
    .findOne('id', uuid)
    .withGraphFetched('[materialsItems.[material],goodTemplates,statuses,goods.[template]]')
    .modifyGraph('materialsItems', (qb) => {
      qb
        .leftJoinRelated('good')
        .whereNull('good.good_id')

    })


  const { materialsItems = [], goodTemplates, goods } = product
  const materialKeyValues = materialsItems.reduce((result, mi) => {
    if (result[mi.materialId]) {
      result[mi.materialId].number++
      return result
    }
    return {
      ...result,
      [mi.materialId]: {
        number: 1,
        ...mi.material
      }
    }
  }, {})
  const goodTemplateUsed = goods.reduce((result, good) => {
    if (result[good.goodTemplateId]) {
      result[good.goodTemplateId].number++
      return result
    }
    return {
      ...result,
      [good.goodTemplateId]: {
        number: 1,
        ...good.template,
      }
    }
  }, {})
  goodTemplates.forEach(gt => {
    gt.remaining = Number(gt.number) - (goodTemplateUsed[gt.id]?.number || 0)
  });





  product.materials = Object.values(materialKeyValues)
  product.goods = Object.values(goodTemplateUsed)
  product.materialsItems = undefined
  res.json(product)
}