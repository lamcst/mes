const slug = require('slug')
const { v5 } = require('uuid')
const { input, MATERIAL_NAMESPACE } = require('./1_materials');
const GOOD_TEMPLATE_NAMESPACE = '6b45c20f-6500-4c62-8147-e1bcc9026488'
exports.GOOD_TEMPLATE_NAMESPACE = GOOD_TEMPLATE_NAMESPACE;
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  await knex('good_templates').insert([
    {
      id:v5('razor desktop', GOOD_TEMPLATE_NAMESPACE),
      name: 'razor desktop', slug: slug('razor desktop'), 
      description:'best selling razor desktop', 
    },
    {
      id:v5('acer desktop', GOOD_TEMPLATE_NAMESPACE),
      name: 'acer desktop', slug: slug('acer desktop'), 
      description:'best selling acer desktop', 
    },
    {
      id:v5('mac', GOOD_TEMPLATE_NAMESPACE),
      name: 'mac', slug: slug('mac'), 
      description:'best selling mac desktop', 
    },
    {
      id:v5('hp', GOOD_TEMPLATE_NAMESPACE),
      name: 'hp', slug: slug('hp'), 
      description:'best selling hp desktop', 
    },
  ]);
  await knex('good_template_materials').insert([
    {
      good_template_id:v5('razor desktop', GOOD_TEMPLATE_NAMESPACE),
      material_id: v5(input[0].name, MATERIAL_NAMESPACE),
      number:2,
    },
    {
      good_template_id:v5('razor desktop', GOOD_TEMPLATE_NAMESPACE),
      material_id: v5(input[1].name, MATERIAL_NAMESPACE),
      number:1,
    },
    {
      good_template_id:v5('razor desktop', GOOD_TEMPLATE_NAMESPACE),
      material_id: v5(input[2].name, MATERIAL_NAMESPACE),
      number:1,
    },
    {
      good_template_id:v5('razor desktop', GOOD_TEMPLATE_NAMESPACE),
      material_id: v5(input[3].name, MATERIAL_NAMESPACE),
      number:1,
    },
    {
      good_template_id:v5('razor desktop', GOOD_TEMPLATE_NAMESPACE),
      material_id: v5(input[4].name, MATERIAL_NAMESPACE),
      number:1,
    },
    {
      good_template_id:v5('razor desktop', GOOD_TEMPLATE_NAMESPACE),
      material_id: v5(input[5].name, MATERIAL_NAMESPACE),
      number:5,
    },
    {
      good_template_id:v5('razor desktop', GOOD_TEMPLATE_NAMESPACE),
      material_id: v5(input[6].name, MATERIAL_NAMESPACE),
      number:1,
    },
    {
      good_template_id:v5('acer desktop', GOOD_TEMPLATE_NAMESPACE),
      material_id: v5(input[0].name, MATERIAL_NAMESPACE),
      number:2,
    },
    {
      good_template_id:v5('acer desktop', GOOD_TEMPLATE_NAMESPACE),
      material_id: v5(input[1].name, MATERIAL_NAMESPACE),
      number:2,
    },
    {
      good_template_id:v5('acer desktop', GOOD_TEMPLATE_NAMESPACE),
      material_id: v5(input[2].name, MATERIAL_NAMESPACE),
      number:3,
    },
    {
      good_template_id:v5('acer desktop', GOOD_TEMPLATE_NAMESPACE),
      material_id: v5(input[3].name, MATERIAL_NAMESPACE),
      number:2,
    },
    {
      good_template_id:v5('acer desktop', GOOD_TEMPLATE_NAMESPACE),
      material_id: v5(input[4].name, MATERIAL_NAMESPACE),
      number:2,
    },
    {
      good_template_id:v5('acer desktop', GOOD_TEMPLATE_NAMESPACE),
      material_id: v5(input[5].name, MATERIAL_NAMESPACE),
      number:2,
    },
    {
      good_template_id:v5('acer desktop', GOOD_TEMPLATE_NAMESPACE),
      material_id: v5(input[6].name, MATERIAL_NAMESPACE),
      number:10,
    },

    {
      good_template_id:v5('mac', GOOD_TEMPLATE_NAMESPACE),
      material_id: v5(input[3].name, MATERIAL_NAMESPACE),
      number:3,
    },
    {
      good_template_id:v5('mac', GOOD_TEMPLATE_NAMESPACE),
      material_id: v5(input[4].name, MATERIAL_NAMESPACE),
      number:1,
    },
    {
      good_template_id:v5('mac', GOOD_TEMPLATE_NAMESPACE),
      material_id: v5(input[5].name, MATERIAL_NAMESPACE),
      number:4,
    },
    {
      good_template_id:v5('mac', GOOD_TEMPLATE_NAMESPACE),
      material_id: v5(input[6].name, MATERIAL_NAMESPACE),
      number:4,
    },

    {
      good_template_id:v5('hp', GOOD_TEMPLATE_NAMESPACE),
      material_id: v5(input[0].name, MATERIAL_NAMESPACE),
      number:2,
    },
    {
      good_template_id:v5('hp', GOOD_TEMPLATE_NAMESPACE),
      material_id: v5(input[1].name, MATERIAL_NAMESPACE),
      number:1,
    },
    {
      good_template_id:v5('hp', GOOD_TEMPLATE_NAMESPACE),
      material_id: v5(input[2].name, MATERIAL_NAMESPACE),
      number:1,
    },
    {
      good_template_id:v5('hp', GOOD_TEMPLATE_NAMESPACE),
      material_id: v5(input[3].name, MATERIAL_NAMESPACE),
      number:1,
    },
    {
      good_template_id:v5('hp', GOOD_TEMPLATE_NAMESPACE),
      material_id: v5(input[4].name, MATERIAL_NAMESPACE),
      number:1,
    },

  ])


  await knex('good_template_tests').insert([
    {
      good_template_id:v5('razor desktop', GOOD_TEMPLATE_NAMESPACE),
      test:"turn on power button",
      expect: "all light turn on",
    },
    {
      good_template_id:v5('razor desktop', GOOD_TEMPLATE_NAMESPACE),
      test:"inspect case logo",
      expect: "logo should be razor",
    },
    {
      good_template_id:v5('razor desktop', GOOD_TEMPLATE_NAMESPACE),
      test:"shake the desktop for 1 minutes",
      expect: "no components drop",
    },
    {
      good_template_id:v5('razor desktop', GOOD_TEMPLATE_NAMESPACE),
      test:"turn on power button with monitor",
      expect: "should able see windows",
    },
    {
      good_template_id:v5('acer desktop', GOOD_TEMPLATE_NAMESPACE),
      test:"turn on power button acer",
      expect: "all light turn on",
    },
    {
      good_template_id:v5('acer desktop', GOOD_TEMPLATE_NAMESPACE),
      test:"inspect case logo acer",
      expect: "logo should be razor",
    },
    {
      good_template_id:v5('acer desktop', GOOD_TEMPLATE_NAMESPACE),
      test:"shake the desktop for 1 minutes acer",
      expect: "no components drop",
    },
    {
      good_template_id:v5('acer desktop', GOOD_TEMPLATE_NAMESPACE),
      test:"turn on power button with monitor acer",
      expect: "should able see windows",
    },

    {
      good_template_id:v5('mac', GOOD_TEMPLATE_NAMESPACE),
      test:"turn on power button mac",
      expect: "all light turn on",
    },
    {
      good_template_id:v5('mac', GOOD_TEMPLATE_NAMESPACE),
      test:"inspect case logo mac",
      expect: "logo should be razor",
    },
    {
      good_template_id:v5('mac', GOOD_TEMPLATE_NAMESPACE),
      test:"shake the desktop for 1 minutes mac",
      expect: "no components drop",
    },
    {
      good_template_id:v5('mac', GOOD_TEMPLATE_NAMESPACE),
      test:"turn on power button with monitor mac",
      expect: "should able see mac os",
    },
    {
      good_template_id:v5('mac', GOOD_TEMPLATE_NAMESPACE),
      test:"is case white enough",
      expect: "should be white and clear",
    },
    {
      good_template_id:v5('mac', GOOD_TEMPLATE_NAMESPACE),
      test:"made toast or not",
      expect: "should be cripy",
    },

    {
      good_template_id:v5('hp', GOOD_TEMPLATE_NAMESPACE),
      test:"turn on power button hp",
      expect: "all light turn on",
    },
    {
      good_template_id:v5('hp', GOOD_TEMPLATE_NAMESPACE),
      test:"inspect case logo hp",
      expect: "logo should be razor",
    },
    {
      good_template_id:v5('hp', GOOD_TEMPLATE_NAMESPACE),
      test:"shake the desktop for 1 minutes hp",
      expect: "no components drop",
    },
    {
      good_template_id:v5('hp', GOOD_TEMPLATE_NAMESPACE),
      test:"turn on power button with monitor hp",
      expect: "should able see hp os",
    },
    {
      good_template_id:v5('hp', GOOD_TEMPLATE_NAMESPACE),
      test:"is case white enough hp",
      expect: "should be white and clear",
    },
    {
      good_template_id:v5('hp', GOOD_TEMPLATE_NAMESPACE),
      test:"made toast or not hp",
      expect: "should be cripy",
    },
  ])
}