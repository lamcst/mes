const { v5 } = require('uuid');
const moment = require('moment');
const { input, MATERIAL_ITEM_NAMESPACE } = require('./1_materials');
const { GOOD_TEMPLATE_NAMESPACE } = require('./2_good_templates');
const PRODUCTIONS_NAMESPACE = '9de57ca1-e1fd-44b6-9d54-e5f5f70be4d4';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  


  /* await knex('productions').insert([
    {
      id:v5('main', PRODUCTIONS_NAMESPACE),
      name: 'main_frame', slug: 'main', 
      description:'main production line', 
      expect_end:moment().add(30,'days').toDate()
    },
    {
      id:v5('main1', PRODUCTIONS_NAMESPACE),
      name: 'main_frame1', slug: 'main1', 
      description:'main production line 1', 
      expect_end:moment().add(30,'days').toDate()
    },
    {
      id:v5('main2', PRODUCTIONS_NAMESPACE),
      name: 'main_frame2', slug: 'main2', 
      description:'main production line 2', 
      expect_end:moment().add(30,'days').toDate()
    },
    {
      id:v5('main3', PRODUCTIONS_NAMESPACE),
      name: 'main_frame3', slug: 'main3', 
      description:'main production line 3', 
      expect_end:moment().add(30,'days').toDate()
    },
    {
      id:v5('main4', PRODUCTIONS_NAMESPACE),
      name: 'main_frame4', slug: 'main4', 
      description:'main production line 4', 
      expect_end:moment().add(30,'days').toDate()
    },
    {
      id:v5('main5', PRODUCTIONS_NAMESPACE),
      name: 'main_frame5', slug: 'main5', 
      description:'main production line 5', 
      expect_end:moment().add(30,'days').toDate()
    },
    {
      id:v5('main6', PRODUCTIONS_NAMESPACE),
      name: 'main_frame6', slug: 'main6', 
      description:'main production line 6', 
      expect_end:moment().add(30,'days').toDate()
    },
    {
      id:v5('main7', PRODUCTIONS_NAMESPACE),
      name: 'main_frame1', slug: 'main7', 
      description:'main production line 7', 
      expect_end:moment().add(30,'days').toDate()
    },
    {
      id:v5('main8', PRODUCTIONS_NAMESPACE),
      name: 'main_frame8', slug: 'main8', 
      description:'main production line 8', 
      expect_end:moment().add(30,'days').toDate()
    },
    {
      id:v5('main9', PRODUCTIONS_NAMESPACE),
      name: 'main_frame9', slug: 'main9', 
      description:'main production line 9', 
      expect_end:moment().add(30,'days').toDate()
    },

    {
      id:v5('main10', PRODUCTIONS_NAMESPACE),
      name: 'main_frame10', slug: 'main10', 
      description:'main production line 10', 
      expect_end:moment().add(30,'days').toDate()
    },
    {
      id:v5('main11', PRODUCTIONS_NAMESPACE),
      name: 'main_frame11', slug: 'main11', 
      description:'main production line 11', 
      expect_end:moment().add(30,'days').toDate()
    },
    {
      id:v5('main12', PRODUCTIONS_NAMESPACE),
      name: 'main_frame12', slug: 'main12', 
      description:'main production line 12', 
      expect_end:moment().add(30,'days').toDate()
    },
    {
      id:v5('main13', PRODUCTIONS_NAMESPACE),
      name: 'main_frame13', slug: 'main13', 
      description:'main production line 13', 
      expect_end:moment().add(30,'days').toDate()
    },
    
    {
      id:v5('main14', PRODUCTIONS_NAMESPACE),
      name: 'main_frame14', slug: 'main14', 
      description:'main production line 14', 
      expect_end:moment().add(30,'days').toDate()
    },

    {
      id:v5('main15', PRODUCTIONS_NAMESPACE),
      name: 'main_frame15', slug: 'main15', 
      description:'main production line 15', 
      expect_end:moment().add(30,'days').toDate()
    },
  ]);
  await knex('prod_material_items').insert([
    {
      prod_id:v5('main', PRODUCTIONS_NAMESPACE),
      material_item_id:v5(input[0].name+0, MATERIAL_ITEM_NAMESPACE)
    }
  ])
  await knex('prod_good_templates').insert([
    {
      prod_id:v5('main', PRODUCTIONS_NAMESPACE),
      good_template_id:v5('razor desktop', GOOD_TEMPLATE_NAMESPACE),
      number:100,
    }
  ]) */
};
