/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('good_templates', (table) => {
    table.uuid("id", {primaryKey: true}).defaultTo(knex.raw("uuid_generate_v4()"));
    table.string('name').notNullable();
    table.string('slug').notNullable();
    table.string('description');
    table.timestamps(true,true)

  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('good_templates');
};
