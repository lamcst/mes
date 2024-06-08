const Materials = require("../models/materials.model")

/**
 * @param { import("express").Request } req
 * @param { import("express").Response } res
 * @param { import("express").NextFunction } next
 * @returns { Promise<void> }
 */
exports.get = async (req, res, next) => {
  const { countMode } = req.query
  const result = await Materials.query()
    .withGraphFetched('items')
    .modifyGraph('items', (qb) => {
      
        
      
      qb.count('material_items.id').groupBy(['material_items.material_id'])
      if(countMode === 'unused') {
        qb.leftJoinRelated('prod')
        .whereNull('prod.prod_id')
      }
    })

  result.forEach(result => {
    result.count = Number((result?.items[0] || [])?.count || 0) 
    
    result.items =  undefined
  })
  res.json(result)
}