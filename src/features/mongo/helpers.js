import { curry, difference, keys, map, prop } from 'ramda';

export const getId = prop('_id');

export const findLatest = (Model, filter) =>
  Model.findOne(filter).sort({
    createdAt: 'desc',
  });

export const findOrCreateOne = curry(async (Model, data, attr) => {
  const filter = {};
  if (attr) {
    filter[attr] = data[attr];
  }

  if (!keys(filter).length) {
    const model = await Model.findOne(filter);
    if (model) {
      return model;
    }
  }

  return Model.create(data);
});

export const manyPickFindOrCreate = curry(async (Model, items, property) => {
  const values = map(prop(property), items);
  const models = await Model.find({
    [property]: {
      $in: values,
    },
  });
  const missingItems = difference(values, map(prop(property), models));
  const itemsToCreate = items.filter(item =>
    missingItems.includes(item[property]),
  );

  if (itemsToCreate.length) {
    const newModels = await Model.create(itemsToCreate);
    models.push(...newModels);
  }

  return models;
});
