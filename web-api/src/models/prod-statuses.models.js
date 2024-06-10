const { Model, snakeCaseMappers } = require('objection');

/**
 * ProdStatuses Model
 * @private
 */
class ProdStatuses extends Model {
  static get tableName() {
    return 'prod_statuses';
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  id

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
 * @typedef ProdStatuses
 */
module.exports = ProdStatuses;