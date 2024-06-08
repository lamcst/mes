const { Model, snakeCaseMappers } = require('objection');

/**
 * Materials Model
 * @private
 */
class Materials extends Model {
  static get tableName() {
    return 'materials';
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
    const MaterialItems = require('./materials-items.models');
    return {
      items:{
        relation: Model.HasManyRelation,
        modelClass: MaterialItems,
        join: {
          from: 'materials.id',
          to: 'material_items.material_id',
        },
      }
    }
  }
}

/**
 * @typedef Materials
 */
module.exports = Materials;