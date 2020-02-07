import { compose, lensProp } from 'ramda';
import { FEATURES } from 'oxium/src/constants';
import { CONFIG } from '../constants';

export const configLens = lensProp(CONFIG);

export const featuresLens = lensProp(FEATURES);

export const configFeaturesLens = compose(configLens, featuresLens);
