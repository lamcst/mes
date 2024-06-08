/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('good_template_materials', (table) => {
    table.uuid("id", {primaryKey: true}).defaultTo(knex.raw("uuid_generate_v4()"));
    table.uuid("material_id").references('id').inTable('materials');
    table.uuid("good_template_id").references('id').inTable('good_templates');
    table.integer("number");
    table.timestamps(true,true)
    
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('good_template_materials');
  
};
