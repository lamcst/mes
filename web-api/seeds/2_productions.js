const { v5 } = require('uuid');
const moment = require('moment');
const { input, MATERIAL_NAMESPACE } = require('./1_materials');
const PRODUCTIONS_NAMESPACE = '9de57ca1-e1fd-44b6-9d54-e5f5f70be4d4';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('productions').del()
  await knex('productions').insert([
    {
      id:v5('main', PRODUCTIONS_NAMESPACE),
      name: 'main_frame', slug: 'main', 
      description:'main production line', 
      expect_end:moment().add(30,'days').toDate()
    },
  ]);
  await knex('prod_material_items').del()
  await knex('prod_material_items').insert([
    {
      prod_id:v5('main', PRODUCTIONS_NAMESPACE),
      material_item_id:v5(input[0].name+0, MATERIAL_NAMESPACE)
    }
  ])

};
