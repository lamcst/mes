const { Model, snakeCaseMappers } = require('objection');

/**
 * ProdMaterialItems Model
 * @private
 */
class Productions extends Model {
  static namespace = '9de57ca1-e1fd-44b6-9d54-e5f5f70be4d4' 
  static get tableName() {
    return 'productions';
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  id
  name
  slug
  expect_end
  description

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
    const MaterialItems = require('./materials-items.models');
    const GoodTemplates = require('./good-templates.models');
    const ProdStatuses = require('./prod-statuses.models');
    const Goods = require('./goods.models');

    return {
      goods:{
        relation: Model.HasManyRelation,
        modelClass: Goods,
        join: {
          from: 'productions.id',
          to: 'goods.prod_id',
        },
      },
      statuses:{
        relation: Model.HasManyRelation,
        modelClass: ProdStatuses,
        join: {
          from: 'productions.id',
          to: 'prod_statuses.prod_id',
        },
        modify(qb){
          qb.orderBy('start', 'desc')
        }
      },
      materialsItems:{
        relation: Model.ManyToManyRelation,
        modelClass: MaterialItems,
        join: {
          from: 'productions.id',
          through: {
            // booking_payments is the join table.
            from: 'prod_material_items.prod_id',
            to: 'prod_material_items.material_item_id'
          },
          to: 'material_items.id',
        },
      },
      goodTemplates:{
        relation: Model.ManyToManyRelation,
        modelClass: GoodTemplates,
        join: {
          from: 'productions.id',
          through: {
            // booking_payments is the join table.
            from: 'prod_good_templates.prod_id',
            to: 'prod_good_templates.good_template_id',
            extra: ['number']
          },
          to: 'good_templates.id',
        },
      }
    }
  }
}

/**
 * @typedef Productions
 */
module.exports = Productions;