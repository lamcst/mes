const { Model, snakeCaseMappers } = require('objection');

/**
 * GoodTemplateMaterials Model
 * @private
 */
class GoodTemplateMaterials extends Model {
  static get tableName() {
    return 'good_template_materials';
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
    const GoodTemplateMaterials = require('./good-template-materials.models');
    return {
      materials:{
        relation: Model.HasManyRelation,
        modelClass: GoodTemplateMaterials,
        join: {
          from: 'good_templates.id',
          to: 'good_template_materials.good_template_id',
        },
      }
    }
  }
}

/**
 * @typedef GoodTemplateMaterials
 */
module.exports = GoodTemplateMaterials;