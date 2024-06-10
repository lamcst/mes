/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('qc_statuses', (table) => {
    table.uuid("id", {primaryKey: true}).defaultTo(knex.raw("uuid_generate_v4()"));
    table.uuid("qc_id").references('id').inTable('quality_controls');
    table.timestamp("start").notNullable();
    table.enum('status', ["start", "stop", "pause", "shut-down", "close", "done"]).notNullable();
    table.timestamps(true,true)

  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('qc_statuses');
};
