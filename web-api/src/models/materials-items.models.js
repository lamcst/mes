const { Model, snakeCaseMappers } = require('objection');

/**
 * MaterialItems Model
 * @private
 */
class MaterialItems extends Model {
  static get tableName() {
    return 'material_items';
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
    const ProdMaterialItems = require('./prod-materials-items.models');
    const GoodMaterialItems = require('./good-material-items.models');
    const Materials = require('./materials.model');

    return {
      prod:{
        relation: Model.HasOneRelation,
        modelClass: ProdMaterialItems,
        join: {
          from: 'material_items.id',
          to: 'prod_material_items.material_item_id',
        },
      },
      good:{
        relation: Model.HasOneRelation,
        modelClass: GoodMaterialItems,
        join: {
          from: 'material_items.id',
          to: 'good_material_items.material_item_id',
        },
      },
      material:{
        relation: Model.HasOneRelation,
        modelClass: Materials,
        join: {
          from: 'material_items.material_id',
          to:'materials.id'
        }
      }
    }
  }
}

/**
 * @typedef MaterialItems
 */
module.exports = MaterialItems;