import { map, mergeAll, pipe, prop, set, view } from 'ramda';
import { MONGO } from './constants';
import { getConfigFeatures } from '../../accessors/config';
import deepDestruct from '../../util/deepDestruct';
import lensPropM from '../../util/lensPropM';

export const getMongo = prop(MONGO);

export const getMongoConfig = pipe(getConfigFeatures, getMongo);

export const modelsLens = lensPropM('models');
export const setModels = set(modelsLens);
export const getModels = view(modelsLens);

export const getAllModels = pipe(map(pipe(getModels, deepDestruct)), mergeAll);
