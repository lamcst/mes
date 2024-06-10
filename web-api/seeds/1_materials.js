const slug = require('slug')
const { v5 } = require('uuid');
const _ = require('lodash')
const MATERIAL_NAMESPACE = 'f46d8eb1-a3ae-466f-8280-90d366b9c01e';
const MATERIAL_ITEM_NAMESPACE = '1e8325cd-de54-4ab8-a1c8-16288d92b15a';
const MATERIALS_INPUT = [{
  name: 'KVR56S46BS6',
  desc: 'DDR5 5600MT/s* Non-ECC Unbuffered SODIMM',
  number: 1000
},{
  name: 'WD4003FFBX',
  desc: 'Western Digital 4TB WD Red Pro NAS Internal Hard Drive HDD - 7200 RPM, SATA 6 Gb/s, CMR,3.5',
  number: 5000
}, {
  name:'MSI PRO B760M-A mATX',
  desc:'MSI PRO B760M-A WIFI mATX Motherboard DDR4/DDR5',
  number: 2000
}, {
  name: 'i5 12600K',
  desc:'i5 12600K',
  number: 5000,
}, {
  name: 'MSI GTX4070',
  desc:'MSI GTX4070',
  number: 6000,
}, {
  name: 'SUPER FAN',
  desc:'SUPER FAN from star planet',
  number: 7000,
}, {
  name: 'SUPER CASE',
  desc:'SUPER CASE from star planet',
  number: 7000,
}]
exports.input = MATERIALS_INPUT
exports.MATERIAL_NAMESPACE = MATERIAL_NAMESPACE
exports.MATERIAL_ITEM_NAMESPACE = MATERIAL_ITEM_NAMESPACE
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  

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
  const materialItemsChunk =  _.chunk(materialItems,1000)
  for(const mi of materialItemsChunk){
    await knex('material_items').insert(mi);
  }
};