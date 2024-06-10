const { Model, snakeCaseMappers } = require('objection');

/**
 * GoodTemplates Model
 * @private
 */
class GoodTemplates extends Model {
  static get tableName() {
    return 'good_templates';
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
    const Materials = require('./materials.model');
     const GoodTemplateTests= require('./good-template-tests.models');
    return {
      materials:{
        relation: Model.ManyToManyRelation,
        modelClass: Materials,
        join: {
          from: 'good_templates.id',
          through: {
            // booking_payments is the join table.
            from: 'good_template_materials.good_template_id',
            to: 'good_template_materials.material_id',
            extra: ['number']
          },
          to: 'materials.id',
        },
      },
      tests:{
        relation: Model.HasManyRelation,
        modelClass: GoodTemplateTests,
        join: {
          from: 'good_templates.id',
          to:'good_template_tests.good_template_id'
        }
      }
    }
  }
}

/**
 * @typedef GoodTemplates
 */
module.exports = GoodTemplates;