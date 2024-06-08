const { Model, snakeCaseMappers } = require('objection');

/**
 * ProdMaterialItems Model
 * @private
 */
class Productions extends Model {
  static get tableName() {
    return 'productions';
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
 * @typedef Productions
 */
module.exports = Productions;