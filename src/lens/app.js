import {
  always,
  compose,
  converge,
  identity,
  lensProp,
  map,
  set,
  useWith,
  view,
} from 'ramda';
import { metaIsLoadedLens, setDefaultMeta } from './feature';
import { byIdLens } from '.';

const featuresLens = lensProp('features');

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

const resetMetaToFeature = useWith(setFeatures, [
  map(setDefaultMeta),
  identity,
]);

export { featuresLens, featureByIdLens, featureByIdIsLoadedLens };

export { getFeatures, setFeatures, resetMetaToFeature };
