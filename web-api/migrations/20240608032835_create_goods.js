/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('goods', (table) => {
    table.uuid("id", {primaryKey: true}).defaultTo(knex.raw("uuid_generate_v4()"));
    table.uuid("prod_id").references('id').inTable('productions');
    table.uuid("good_template_id").references('id').inTable('good_templates');
    table.enum('status', ["produced", "defect", "qc-ed", "shipped"]).notNullable();

    table.timestamps(true,true)
    
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('goods');
};