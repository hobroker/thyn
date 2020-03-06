import { map, mergeAll, pipe, set, view } from 'ramda';
import deepDestruct from '../../util/deepDestruct';
import lensPropM from '../../util/lensPropM';

export const modelsLens = lensPropM('models');
export const setModels = set(modelsLens);
export const getModels = view(modelsLens);

export const getAllModels = pipe(map(pipe(getModels, deepDestruct)), mergeAll);
