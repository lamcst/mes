const { Model, snakeCaseMappers } = require('objection');

/**
 * ProdGoodTemplates Model
 * @private
 */
class ProdGoodTemplates extends Model {
  static get tableName() {
    return 'prod_good_templates';
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }
  id
  prod_id
  good_template_id
  number

  $beforeInsert() {
    const timestamp = new Date().toISOString();
    this.createdAt = timestamp;
    this.updatedAt = timestamp;
  }

  $beforeUpdate() {
    const timestamp = new Date().toISOString();
    this.updatedAt = timestamp;
  }
}

/**
 * @typedef ProdGoodTemplates
 */
module.exports = ProdGoodTemplates;