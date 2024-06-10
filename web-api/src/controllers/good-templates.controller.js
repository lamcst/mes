const GoodTemplates = require("../models/good-templates.models")

/**
 * @param { import("express").Request } req
 * @param { import("express").Response } res
 * @param { import("express").NextFunction } next
 * @returns { Promise<void> }
 */
exports.get = async (req, res, next) => {
  const result = await GoodTemplates.query()
    .withGraphFetched('[materials,tests]')
  res.json(result);
}