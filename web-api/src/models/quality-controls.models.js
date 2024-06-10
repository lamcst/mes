
const { Model, snakeCaseMappers } = require('objection');

/**
 * QualityControls Model
 * @private
 */
class QualityControls extends Model {
  static get tableName() {
    return 'quality_controls';
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
  static get relationMappings() {
    /* const MaterialItems = require('./materials-items.models');
    const GoodTemplates = require('./good-templates.models');
    const ProdStatuses = require('./prod-statuses.models');
    const Goods = require('./goods.models'); */
    const Goods = require('./goods.models');
    const QcStatuses = require('./qc-statuses.models');
    return {
      goods:{
        relation: Model.ManyToManyRelation,
        modelClass: Goods,
        join: {
          from: 'quality_controls.id',
          through: {
            from: 'qc_goods.qc_id',
            to: 'qc_goods.good_id'
          },
          to: 'goods.id',
          
        },
      },
      statuses:{
        relation: Model.HasManyRelation,
        modelClass: QcStatuses,
        join: {
          from: 'quality_controls.id',
          to: 'qc_statuses.qc_id',
        },
        modify(qb){
          qb.orderBy('start', 'desc')
        }
      },
    }
  }
}

/**
 * @typedef QualityControls
 */
module.exports = QualityControls;