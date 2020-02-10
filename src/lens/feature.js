import {
  assoc,
  compose,
  defaultTo,
  identity,
  lens,
  lensProp,
  prop,
  set,
  useWith,
  view,
} from 'ramda';
import { metaLens, setFeatureIsLoaded } from 'oxium';
import deepDestruct from '../util/deepDestruct';
import { DEFAULT, MODELS, RESULT, SHARED, WEAVE } from '../constants';

export const defaultLens = lensProp(DEFAULT);
export const weaveLens = lensProp(WEAVE);
export const resultLens = lensProp(RESULT);
export const modelsLens = lens(
  compose(defaultTo({}), prop(MODELS)),
  useWith(assoc(MODELS), [deepDestruct, identity]),
);
export const sharedLens = lensProp(SHARED);

export const defaultWeaveLens = compose(weaveLens, defaultLens);
export const metaResultLens = compose(metaLens, resultLens);
export const metaModelsLens = compose(sharedLens, modelsLens);

export const setDefaultWeave = set(defaultWeaveLens);

export const setHandlerResult = set(metaResultLens);
export const setDefaultMeta = setFeatureIsLoaded(false);

export const shareModels = set(metaModelsLens);
export const getSharedModels = view(metaModelsLens);
