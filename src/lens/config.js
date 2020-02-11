import { featuresLens } from 'oxium';
import { compose, lensProp } from 'ramda';
import { CONFIG } from '../constants';

export const configLens = lensProp(CONFIG);

export const configFeaturesLens = compose(configLens, featuresLens);
