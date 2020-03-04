import assert from 'assert';
import { difference, keys, map } from 'ramda';

/**
 * @param {object} data
 * @param {string} attr
 * @private
 */
export async function findOrCreateOne(data, attr) {
  assert('data', 'data is required');

  const filter = {};
  if (attr) {
    filter[attr] = data[attr];
  }

  if (!keys(filter).length) {
    const model = await this.findOne(filter);
    if (model) {
      return model;
    }
  }

  return this.create(data);
}

/**
 * @param {object} items
 * @param {string} property
 * @private
 */
export async function manyPickFindOrCreate(items, property) {
  const values = map(property, items);
  const models = await this.find({
    [property]: {
      $in: values,
    },
  });
  const missingItems = difference(values, map(property, models));
  const itemsToCreate = items.filter(item =>
    missingItems.includes(item[property]),
  );

  if (itemsToCreate.length) {
    const newModels = await this.create(itemsToCreate);
    models.push(...newModels);
  }

  return models;
}
