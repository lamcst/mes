const { Model, snakeCaseMappers } = require('objection');

/**
 * ProdMaterialItems Model
 * @private
 */
class ProdMaterialItems extends Model {
  static get tableName() {
    return 'prod_material_items';
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }

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
 * @typedef ProdMaterialItems
 */
module.exports = ProdMaterialItems;