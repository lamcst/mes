const Goods = require("../models/goods.models");
/**
 * @param { import("express").Request } req
 * @param { import("express").Response } res
 * @param { import("express").NextFunction } next
 * @returns { Promise<void> }
 */
exports.getStatusInfo = async (req, res, next) => {
  const result = await Goods.query().select('status').count('id').groupBy('status')
  res.json(result);
}
/**
 * @param { import("express").Request } req
 * @param { import("express").Response } res
 * @param { import("express").NextFunction } next
 * @returns { Promise<void> }
 */
exports.get = async (req, res, next) => {
  const { status } = req.query
  const result = await Goods.query()
    .withGraphFetched('[template]')
    .leftJoinRelated('qc')
    .whereNull('qc.id')
    .modify(qb=>{
      if(status){
        qb.where('status', status)
      }
    })
  
  res.json(result);
}