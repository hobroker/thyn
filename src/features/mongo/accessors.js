import { mapObjIndexed, pipe, prop } from 'ramda';
import { MONGO, SCHEMA } from './constants';
import { getAllModels } from '../../accessors/root';
import createSchema from './util/createSchema';
import { getConfigFeatures } from '../../accessors/config';

export const getSchema = prop(SCHEMA);

export const getMongoConfig = pipe(getConfigFeatures, prop(MONGO));

export const getAllMongoModels = pipe(
  getAllModels,
  mapObjIndexed(pipe(getSchema, createSchema)),
);
