import { set, view } from 'ramda';
import { ENV } from '../constants';
import lensPropM from '../util/lensPropM';

export const envLens = lensPropM(ENV);
export const setEnv = set(envLens);
export const getEnv = view(envLens);
