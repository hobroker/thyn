import {
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
import { metaIsLoadedLens } from 'oxium/src/lens/feature';
import { featuresLens, getFeatures, setFeatures } from 'oxium/src/lens/app';
import { getSharedModels, setDefaultMeta } from './feature';
import { areAllFeaturesLoaded } from './features';
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

export const areAppFeaturesLoaded = compose(areAllFeaturesLoaded, getFeatures);

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
