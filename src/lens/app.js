import {
  all,
  always,
  applyTo,
  compose,
  converge,
  identity,
  map,
  mergeAll,
  pipe,
  useWith,
  values,
  when,
} from 'ramda';
import { isFunction } from 'ramda-adjunct';
import {
  metaIsLoadedLens,
  featuresLens,
  getFeatures,
  setFeatures,
} from 'oxium';

import { getSharedModels, isFeatureLoaded, setDefaultMeta } from './feature';
import byIdLens from '../util/byIdLens';
import deepDestruct from '../util/deepDestruct';

export const featureByIdLens = converge(compose, [
  always(featuresLens),
  compose(byIdLens, identity),
]);

export const featureByIdIsLoadedLens = converge(compose, [
  featureByIdLens,
  always(metaIsLoadedLens),
]);

export const areAppFeaturesLoaded = pipe(getFeatures, all(isFeatureLoaded));

export const resetMetaToFeatures = useWith(setFeatures, [
  pipe(values, map(when(isFunction, applyTo({}))), map(setDefaultMeta)),
  identity,
]);

export const geAllModels = compose(
  deepDestruct,
  mergeAll,
  map(getSharedModels),
  getFeatures,
);
