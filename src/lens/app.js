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
import esModuleValues from '../util/esModuleValues';
import { byIdLens } from '.';
import { areAllFeaturesLoaded } from './features';

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

const areAppFeaturesLoaded = compose(areAllFeaturesLoaded, getFeatures);

const resetMetaToFeatures = useWith(setFeatures, [
  compose(map(setDefaultMeta), esModuleValues),
  identity,
]);

export { featuresLens, featureByIdLens, featureByIdIsLoadedLens };

export { getFeatures, setFeatures, resetMetaToFeatures, areAppFeaturesLoaded };
