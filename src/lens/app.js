import {
  always,
  applyTo,
  compose,
  converge,
  identity,
  lensProp,
  map,
  mergeAll,
  set,
  useWith,
  view,
  when,
} from 'ramda';
import { isFunction } from 'ramda-adjunct';
import { FEATURES } from 'oxium/src/constants';
import { getSharedModels, metaIsLoadedLens, setDefaultMeta } from './feature';
import esModuleValues from '../util/esModuleValues';
import { areAllFeaturesLoaded } from './features';
import { byIdLens } from '../util/lens';
import deepDestruct from '../util/deepDestruct';

export const featuresLens = lensProp(FEATURES);

export const featureByIdLens = converge(compose, [
  always(featuresLens),
  compose(byIdLens, identity),
]);

export const featureByIdIsLoadedLens = converge(compose, [
  featureByIdLens,
  always(metaIsLoadedLens),
]);

export const getFeatures = view(featuresLens);
export const setFeatures = set(featuresLens);

export const areAppFeaturesLoaded = compose(areAllFeaturesLoaded, getFeatures);

export const resetMetaToFeatures = useWith(setFeatures, [
  compose(
    map(setDefaultMeta),
    map(when(isFunction, applyTo({}))),
    esModuleValues,
  ),
  identity,
]);

export const geAllModels = compose(
  deepDestruct,
  mergeAll,
  map(getSharedModels),
  getFeatures,
);
