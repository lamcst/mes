const { Model, snakeCaseMappers } = require('objection');

/**
 * QcGoods Model
 * @private
 */
class QcGoods extends Model {
  static get tableName() {
    return 'qc_goods';
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
 * @typedef QcGoods
 */
module.exports = QcGoods;