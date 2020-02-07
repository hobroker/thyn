import { curry, mapObjIndexed } from 'ramda';
import mongoose, { Schema } from 'mongoose';
import {
  MONGOOSE_CONNECT_OPTIONS,
  MONGOOSE_SCHEMA_OPTIONS,
} from '../constants';
import { getSchema } from '../lens';
import { debugMongo } from '..';

const createSchema = value => new Schema(value, MONGOOSE_SCHEMA_OPTIONS);

export const loadModels = curry((mongo, models) =>
  mapObjIndexed((model, name) => {
    const schema = createSchema(getSchema(model));
    debugMongo('load model', name);

    return mongo.model(name, schema);
  }, models),
);

export const connectMongo = async connectionString => {
  debugMongo('connecting to %s', connectionString);

  const mongo = await mongoose.connect(
    connectionString,
    MONGOOSE_CONNECT_OPTIONS,
  );

  debugMongo('connected');

  return mongo;
};
