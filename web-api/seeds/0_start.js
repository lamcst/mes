/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  await knex.raw(`SET session_replication_role = 'replica'`)
  await knex('prod_good_templates').del()
  await knex('good_template_materials').del()
  await knex('good_templates').del()
  await knex('productions').del()
  await knex('material_items').del()


  await knex('prod_material_items').del()
  await knex('good_template_tests').del()
  await knex('materials').del()

}