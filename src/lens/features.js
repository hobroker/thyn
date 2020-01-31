import { all, compose, curry, defaultTo, find, propEq } from 'ramda';
import { getId, isFeatureLoaded } from './feature';

const featureIdEq = compose(propEq('id'), getId);

const areAllFeaturesLoaded = all(isFeatureLoaded);

const findFeatureReplacement = curry((newFeatures, feature) => {
  const result = find(featureIdEq(feature), newFeatures);

  return defaultTo(feature, result);
});

export { areAllFeaturesLoaded, findFeatureReplacement };
