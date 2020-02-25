import { lensPathM } from 'oxium';
import { set, view } from 'ramda';
import { ENV, MODELS } from '../constants';

export const modelsLens = lensPathM([MODELS]);
export const setModels = set(modelsLens);
export const getModels = view(modelsLens);

export const envLens = lensPathM([ENV]);
export const setEnv = set(envLens);
export const getEnv = view(envLens);
