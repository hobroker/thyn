import { compose, curry, defaultTo, map, mapObjIndexed, mergeAll } from 'ramda';
import { Schema } from 'mongoose';
import { getFeatures } from '../../../lens/app';
import { getSharedModels } from '../../../lens/feature';
import { MONGOOSE_SCHEMA_OPTIONS } from '../constants';
import { getSchema } from '../lens';
import { debugMongo } from '..';

const createSchema = value => new Schema(value, MONGOOSE_SCHEMA_OPTIONS);

export const collectAppModels = compose(
  mergeAll,
  map(compose(defaultTo({}), getSharedModels)),
  getFeatures,
);

export const loadModels = curry((mongo, models) =>
  mapObjIndexed((model, key) => {
    const schema = createSchema(getSchema(model));
    debugMongo('load model', key);

    return mongo.model(key, schema);
  }, models),
);
