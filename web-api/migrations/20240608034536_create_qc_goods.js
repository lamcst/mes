/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('qc_goods', (table) => {
    table.uuid("id", {primaryKey: true}).defaultTo(knex.raw("uuid_generate_v4()"));
    table.uuid("qc_id").references('id').inTable('quality_controls');
    table.uuid("good_id").references('id').inTable('goods');
    table.timestamps(true,true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('qc_goods');
  
};
