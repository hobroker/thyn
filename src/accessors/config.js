import { featuresLens } from 'oxium';
import { compose, lensProp, view } from 'ramda';
import { CONFIG } from '../constants';

export const configLens = lensProp(CONFIG);

export const configFeaturesLens = compose(configLens, featuresLens);

export const getConfigFeatures = view(configFeaturesLens);
