import { all } from 'ramda';
import { isFeatureLoaded } from './feature';

const areAllFeaturesLoaded = all(isFeatureLoaded);

export { areAllFeaturesLoaded };
