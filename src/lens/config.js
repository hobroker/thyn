import { compose, lensProp } from 'ramda';
import { FEATURES } from 'oxium/src/constants';
import { CONFIG } from '../constants';

const configLens = lensProp(CONFIG);
const featuresLens = lensProp(FEATURES);
const configFeaturesLens = compose(configLens, featuresLens);

export { configLens, featuresLens, configFeaturesLens };
