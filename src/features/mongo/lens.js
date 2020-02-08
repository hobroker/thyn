import { compose, lensProp, prop, view } from 'ramda';
import { featureByIdIsLoadedLens, featureByIdLens } from '../../lens/app';
import { configFeaturesLens } from '../../lens/config';
import { defaultWeaveLens } from '../../lens/feature';
import { MONGO, SCHEMA } from './constants';

export const mongoLens = lensProp(MONGO);
export const featuresMongoLens = featureByIdLens(MONGO);
export const isMongoLoadedLens = featureByIdIsLoadedLens(MONGO);
export const configFeaturesMongoLens = compose(configFeaturesLens, mongoLens);
export const defaultMongoLens = compose(featuresMongoLens, defaultWeaveLens);

export const getMongoConfig = view(configFeaturesMongoLens);

export const isMongoLoaded = view(isMongoLoadedLens);

export const getDefaultMongoWeave = view(defaultMongoLens);

export const getSchema = prop(SCHEMA);
