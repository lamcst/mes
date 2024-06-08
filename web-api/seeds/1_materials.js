const slug = require('slug')
const { v5 } = require('uuid');
const MATERIAL_NAMESPACE = 'f46d8eb1-a3ae-466f-8280-90d366b9c01e';
const MATERIAL_ITEM_NAMESPACE = 'f46d8eb1-a3ae-466f-8280-90d366b9c01e';
const MATERIALS_INPUT = [{
  name: 'KVR56S46BS6',
  desc: 'DDR5 5600MT/s* Non-ECC Unbuffered SODIMM',
  number: 100
},{
  name: 'WD4003FFBX',
  desc: 'Western Digital 4TB WD Red Pro NAS Internal Hard Drive HDD - 7200 RPM, SATA 6 Gb/s, CMR,3.5',
  number: 500
}, {
  name:'MSI PRO B760M-A mATX',
  desc:'MSI PRO B760M-A WIFI mATX Motherboard DDR4/DDR5',
  number: 200
}, {
  name: 'i5 12600K',
  desc:'i5 12600K',
  number: 50,
}, {
  name: 'MSI GTX4070',
  desc:'MSI GTX4070',
  number: 60,
}]
exports.input = MATERIALS_INPUT
exports.MATERIAL_NAMESPACE = MATERIAL_NAMESPACE
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('material_items').del()

  await knex('materials').del()
  const materialItems = []
  const materialInputs = MATERIALS_INPUT.map((material) => {
    const { name, desc, number } = material;
    const materialId = v5(name, MATERIAL_NAMESPACE)
    for (let i = 0;i < number;i++) {
      const id = v5(name + i, MATERIAL_ITEM_NAMESPACE)
      materialItems.push({ id, material_id: materialId, barcode: id })
    }
    return { id: materialId, name, slug: slug(name), description: desc }
  })
  await knex('materials').insert(materialInputs);

  await knex('material_items').insert(materialItems);
};