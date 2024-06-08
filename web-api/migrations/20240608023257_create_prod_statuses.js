/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('prod_statuses', (table) => {
    table.uuid("id", {primaryKey: true}).defaultTo(knex.raw("uuid_generate_v4()"));
    table.uuid("prod_id").references('id').inTable('productions');
    table.timestamp("start").notNullable();
    table.enum('status', ["start", "stop", "pause", "shut-down", "close", "done"]).notNullable();
    table.timestamps(true,true)

    /** to update enum, example:
     * exports.up = knex =>
    knex.raw(`
        ALTER TABLE ONLY user_associations
        DROP CONSTRAINT user_associations_service_check;

        ALTER TABLE ONLY user_associations
        ADD CONSTRAINT user_associations_service_check
        CHECK ("service" = ANY (ARRAY['alpha'::text, 'beta'::text, 'gamma'::text]));
    `)

      exports.down = knex =>
          knex.raw(`
              ALTER TABLE ONLY user_associations
              DROP CONSTRAINT user_associations_service_check;

              ALTER TABLE ONLY user_associations
              ADD CONSTRAINT user_associations_service_check
              CHECK ("service" = ANY (ARRAY['alpha'::text, 'beta'::text));
          `)
     */
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('prod_statuses');
};
