const { Model, snakeCaseMappers } = require('objection');

/**
 * Goods Model
 * @private
 */
class Goods extends Model {
  static get tableName() {
    return 'goods';
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
    const GoodTestResults = require('./good-test-results.models');

    return {
      template:{
        relation: Model.HasOneRelation,
        modelClass: GoodTemplates,
        join: {
          from: 'goods.good_template_id',
          to:'good_templates.id'
        }
      },
      qc: {
        relation: Model.HasOneRelation,
        modelClass: QcGoods,
        join: {
          from:'goods.id',
          to: 'qc_goods.good_id'
        }
      },
      testResults:{
        relation: Model.HasManyRelation,
        modelClass: GoodTestResults,
        join: {
          from:'goods.id',
          to: 'good_test_results.good_id'
        }
      }
    }
  }
}

/**
 * @typedef Goods
 */
module.exports = Goods;