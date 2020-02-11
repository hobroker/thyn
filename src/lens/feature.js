import {
  applyTo,
  assoc,
  compose,
  defaultTo,
  either,
  equals,
  identity,
  lens,
  lensProp,
  not,
  pipe,
  prop,
  set,
  useWith,
  view,
  when,
} from 'ramda';
import { metaLens, setFeatureIsLoaded } from 'oxium';
import { isFunction } from 'ramda-adjunct';
import deepDestruct from '../util/deepDestruct';
import { DEFAULT, ENV, MODELS, RESULT, SHARED, WEAVE } from '../constants';

export const defaultLens = lensProp(DEFAULT);
export const weaveLens = lensProp(WEAVE);
export const resultLens = lensProp(RESULT);
export const envLens = lensProp(ENV);
export const modelsLens = lens(
  compose(defaultTo({}), prop(MODELS)),
  useWith(assoc(MODELS), [deepDestruct, identity]),
);
export const sharedLens = lensProp(SHARED);

export const defaultWeaveLens = compose(weaveLens, defaultLens);
export const metaResultLens = compose(metaLens, resultLens);
export const metaEnvLens = compose(metaLens, envLens);
export const metaModelsLens = compose(sharedLens, modelsLens);

export const setDefaultWeave = set(defaultWeaveLens);

export const setHandlerResult = set(metaResultLens);
export const setDefaultMeta = setFeatureIsLoaded(false);

export const setMetaEnv = set(metaEnvLens);
export const getMetaEnv = view(metaEnvLens);

export const getEnv = view(envLens);
export const isOnValidEnv = env => pipe(getMetaEnv, either(not, equals(env)));

export const shareModels = set(metaModelsLens);
export const getSharedModels = view(metaModelsLens);

export const prepareRawFeature = pipe(
  when(isFunction, applyTo({})),
  setDefaultMeta,
);
