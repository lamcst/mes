const { Model, snakeCaseMappers } = require('objection');

/**
 * QcStatuses Model
 * @private
 */
class QcStatuses extends Model {
  static get tableName() {
    return 'qc_statuses';
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
 * @typedef QcStatuses
 */
module.exports = QcStatuses;