import {
  assoc,
  compose,
  identity,
  lens,
  lensProp,
  prop,
  set,
  useWith,
  values,
  view,
} from 'ramda';
import { featureByIdIsLoadedLens, featureByIdLens } from '../../lens/app';
import { configFeaturesLens } from '../../lens/config';
import { defaultWeaveLens, sharedLens } from '../../lens/feature';
import { MONGO } from './constants';

export const modelsLens = lens(
  prop('models'),
  useWith(assoc('models'), [values, identity]),
);
export const mongoLens = lensProp(MONGO);
export const configFeaturesMongoLens = compose(configFeaturesLens, mongoLens);
export const featuresMongoLens = featureByIdLens(MONGO);
export const isMongoLoadedLens = featureByIdIsLoadedLens(MONGO);
export const metaModelsLens = compose(sharedLens, modelsLens);
export const defaultMongoLens = compose(featuresMongoLens, defaultWeaveLens);

export const getMongoConfig = view(configFeaturesMongoLens);

export const getMongo = view(featuresMongoLens);

export const isMongoLoaded = view(isMongoLoadedLens);

export const shareMongoModels = set(metaModelsLens);
export const getSharedModels = view(metaModelsLens);

export const getDefaultMongoWeave = view(defaultMongoLens);

export const getSchema = prop('schema');
