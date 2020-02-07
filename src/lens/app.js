import {
  always,
  applyTo,
  compose,
  converge,
  identity,
  lensProp,
  map,
  set,
  useWith,
  view,
  when,
} from 'ramda';
import { isFunction } from 'ramda-adjunct';
import { FEATURES } from 'oxium/src/constants';
import { metaIsLoadedLens, setDefaultMeta } from './feature';
import esModuleValues from '../util/esModuleValues';
import { areAllFeaturesLoaded } from './features';
import { byIdLens } from '../util/lens';

const featuresLens = lensProp(FEATURES);

const featureByIdLens = converge(compose, [
  always(featuresLens),
  compose(byIdLens, identity),
]);

const featureByIdIsLoadedLens = converge(compose, [
  featureByIdLens,
  always(metaIsLoadedLens),
]);

const getFeatures = view(featuresLens);
const setFeatures = set(featuresLens);

const areAppFeaturesLoaded = compose(areAllFeaturesLoaded, getFeatures);

const resetMetaToFeatures = useWith(setFeatures, [
  compose(
    map(setDefaultMeta),
    map(when(isFunction, applyTo({}))),
    esModuleValues,
  ),
  identity,
]);

export { featuresLens, featureByIdLens, featureByIdIsLoadedLens };

export { getFeatures, setFeatures, resetMetaToFeatures, areAppFeaturesLoaded };
