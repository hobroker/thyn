import mongoose from 'mongoose';
import { curry, mapObjIndexed } from 'ramda';
import { debugIt } from '../../../util/debug';
import createSchema from './createSchema';

const createModel = name => {
  const model = class extends mongoose.Model {};

  Object.defineProperty(model, 'name', {
    value: name,
  });

  return model;
};

const loadModels = curry((mongo, models) =>
  mapObjIndexed(({ default: schema }, name) => {
    const Model = createModel(name);
    debugIt('add', Model.name);

    return mongo.model(Model, createSchema(schema));
  }, models),
);

export default loadModels;
