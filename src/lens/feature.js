import {
  assoc,
  compose,
  defaultTo,
  identity,
  lens,
  lensProp,
  not,
  prop,
  set,
  useWith,
  view,
} from 'ramda';
import { IS_LOADED, META } from 'oxium/src/constants';
import { handlerLens, idLens } from 'oxium/src/lens/feature';
import deepDestruct from '../util/deepDestruct';
import { DEFAULT, MODELS, RESULT, SHARED, WEAVE } from '../constants';

export const defaultLens = lensProp(DEFAULT);
export const weaveLens = lensProp(WEAVE);
export const metaLens = lensProp(META);
export const isLoadedLens = lensProp(IS_LOADED);
export const resultLens = lensProp(RESULT);
export const modelsLens = lens(
  compose(defaultTo({}), prop(MODELS)),
  useWith(assoc(MODELS), [deepDestruct, identity]),
);
export const sharedLens = lensProp(SHARED);

export const defaultWeaveLens = compose(weaveLens, defaultLens);
export const metaIsLoadedLens = compose(metaLens, isLoadedLens);
export const metaResultLens = compose(metaLens, resultLens);
export const metaModelsLens = compose(sharedLens, modelsLens);

export const getWeave = view(weaveLens);
export const setDefaultWeave = set(defaultWeaveLens);

export const getMeta = view(metaLens);
export const isFeatureLoaded = view(metaIsLoadedLens);
export const isFeatureUnloaded = compose(not, isFeatureLoaded);
export const setFeatureIsLoaded = set(metaIsLoadedLens);
export const setHandlerResult = set(metaResultLens);
export const setDefaultMeta = setFeatureIsLoaded(false);

export const shareModels = set(metaModelsLens);
export const getSharedModels = view(metaModelsLens);

export const setId = set(idLens);
export const setHandler = set(handlerLens);
