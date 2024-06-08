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
    return {
      prod:{
        relation: Model.HasOneRelation,
        modelClass: ProdMaterialItems,
        join: {
          from: 'material_items.id',
          to: 'prod_material_items.material_item_id',
        },
      }
    }
  }
}

/**
 * @typedef MaterialItems
 */
module.exports = MaterialItems;