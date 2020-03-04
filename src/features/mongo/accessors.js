import { map, mergeAll, pipe, prop } from 'ramda';
import { MONGO, SCHEMA } from './constants';
import { getConfigFeatures } from '../../accessors/config';
import { getModels } from '../../accessors/feature';
import deepDestruct from '../../util/deepDestruct';

export const getMongo = prop(MONGO);

export const getSchema = prop(SCHEMA);

export const getMongoConfig = pipe(getConfigFeatures, getMongo);

export const getAllModels = pipe(map(pipe(getModels, deepDestruct)), mergeAll);
