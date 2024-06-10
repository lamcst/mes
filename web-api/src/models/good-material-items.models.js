const { Model, snakeCaseMappers } = require('objection');

/**
 * GoodMaterialItems Model
 * @private
 */
class GoodMaterialItems extends Model {
  static get tableName() {
    return 'good_material_items';
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
 * @typedef GoodMaterialItems
 */
module.exports = GoodMaterialItems;