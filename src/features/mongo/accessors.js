import { compose, map, mergeAll, pipe, prop, set, view } from 'ramda';
import deepDestruct from '../../util/deepDestruct';
import lensPropM from '../../util/lensPropM';
import { MONGO } from './constants';
import { getConfigFeatures } from '../../accessors/config';

export const modelsLens = lensPropM('models');
export const setModels = set(modelsLens);
export const getModels = view(modelsLens);

export const getMongoConfig = compose(prop(MONGO), getConfigFeatures);

export const getAllModels = pipe(map(pipe(getModels, deepDestruct)), mergeAll);
