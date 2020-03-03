import mongoose from 'mongoose';
import { curry, mapObjIndexed, toPairs } from 'ramda';
import { debugIt } from '../../../util/debug';
import createSchema from './createSchema';

const createModel = (name, rest) => {
  const model = class extends mongoose.Model {
    static name = name;
  };

  toPairs(rest).forEach(([key, fn]) => {
    model.prototype[key] = fn;
  });

  return model;
};

const loadModels = curry((mongo, models) =>
  mapObjIndexed(({ default: schema, ...rest }, name) => {
    debugIt('add', name);

    return mongo.model(createModel(name, rest), createSchema(schema));
  }, models),
);

export default loadModels;
