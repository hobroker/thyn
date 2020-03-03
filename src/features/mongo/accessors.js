import { pipe, prop } from 'ramda';
import { MONGO, SCHEMA } from './constants';
import { getAllModels } from '../../accessors/root';
import { getConfigFeatures } from '../../accessors/config';

export const getMongo = prop(MONGO);

export const getSchema = prop(SCHEMA);

export const getMongoConfig = pipe(getConfigFeatures, getMongo);

export const getAllMongoModels = pipe(getAllModels);
