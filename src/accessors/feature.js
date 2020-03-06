import { equals, pipe, set, view } from 'ramda';
import lensPropM from '../util/lensPropM';
import { CLI, ENV, WEB } from '../features/cli/constants';

export const envLens = lensPropM(ENV);
export const setEnv = set(envLens);
export const getEnv = view(envLens);

export const isWebEnv = pipe(getEnv, equals(WEB));
export const isCliEnv = pipe(getEnv, equals(CLI));
