import { compose, curry, defaultTo, flatten, indexBy, map, prop } from 'ramda';
import { Schema } from 'mongoose';
import { getFeatures } from '../../../lens/app';
import { MONGOOSE_SCHEMA_OPTIONS } from '../constants';
import { getSharedModels } from '../lens';
import { debugMongo } from '..';

const createSchema = value => new Schema(value, MONGOOSE_SCHEMA_OPTIONS);

export const collectAppModels = compose(
  flatten,
  map(compose(defaultTo([]), getSharedModels)),
  getFeatures,
);

export const loadModels = curry((mongo, models) =>
  compose(
    indexBy(prop('name')),
    map(Model => {
      const schema = createSchema(Model);
      debugMongo('load model', Model.name);

      return mongo.model(Model, schema);
    }),
  )(models),
);
