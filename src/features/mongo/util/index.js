import {
  compose,
  curry,
  defaultTo,
  filter,
  flatten,
  indexBy,
  map,
  prop,
} from 'ramda';
import { isFunction } from 'ramda-adjunct';
import { Schema } from 'mongoose';
import { MONGOOSE_SCHEMA_OPTIONS } from '../constants';
import { getSchema, getSharedModels } from '../lens';
import { getFeatures } from '../../../lens/app';
import { debugMongo } from '..';

const createSchema = value => new Schema(value, MONGOOSE_SCHEMA_OPTIONS);

const createSchemaFromModel = compose(createSchema, getSchema);

export const collectModels = compose(
  filter(isFunction),
  flatten,
  map(compose(defaultTo([]), getSharedModels)),
  getFeatures,
);

export const loadModels = curry((mongo, models) =>
  compose(
    indexBy(prop('name')),
    map(Model => {
      const schema = createSchemaFromModel(Model);
      debugMongo('load model', Model.name);

      return mongo.model(Model, schema);
    }),
  )(models),
);
