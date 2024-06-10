const { Model, snakeCaseMappers } = require('objection');

/**
 * GoodTemplateTests Model
 * @private
 */
class GoodTemplateTests extends Model {
  static get tableName() {
    return 'good_template_tests';
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
 * @typedef GoodTemplateTests
 */
module.exports = GoodTemplateTests;