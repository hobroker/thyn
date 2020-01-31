import { compose, lensProp } from 'ramda';

const configLens = lensProp('config');
const featuresLens = lensProp('features');
const configFeaturesLens = compose(configLens, featuresLens);

export { configLens, featuresLens, configFeaturesLens };
