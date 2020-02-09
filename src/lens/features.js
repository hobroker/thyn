import { all } from 'ramda';
import { isFeatureLoaded } from './feature';

export const areAllFeaturesLoaded = all(isFeatureLoaded);
