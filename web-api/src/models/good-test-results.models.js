const { Model, snakeCaseMappers } = require('objection');

/**
 * GoodTestResults Model
 * @private
 */
class GoodTestResults extends Model {
  static get tableName() {
    return 'good_test_results';
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
  static get relationMappings() {
    const GoodTemplates = require('./good-templates.models')
    const QcGoods = require('./qc-goods.models')
    const GoodTemplateTests = require('./good-template-tests.models');

    return {
      template:{
        relation: Model.HasOneRelation,
        modelClass: GoodTemplateTests,
        join: {
          from: 'good_test_results.good_template_test_id',
          to:'good_template_tests.id'
        }
      }
    }
  }
}

/**
 * @typedef GoodTestResults
 */
module.exports = GoodTestResults;