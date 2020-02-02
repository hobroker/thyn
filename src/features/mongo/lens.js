import {
  assoc,
  compose,
  identity,
  lens,
  lensProp,
  prop,
  set,
  useWith,
  view,
} from 'ramda';
import esModuleValues from '../../util/esModuleValues';
import { featureByIdIsLoadedLens, featureByIdLens } from '../../lens/app';
import { configFeaturesLens } from '../../lens/config';
import { defaultWeaveLens, sharedLens } from '../../lens/feature';
import { MODELS, MONGO, SCHEMA } from './constants';

const mongoLens = lensProp(MONGO);
const configFeaturesMongoLens = compose(configFeaturesLens, mongoLens);
const featuresMongoLens = featureByIdLens(MONGO);
const defaultMongoLens = compose(featuresMongoLens, defaultWeaveLens);
const isMongoLoadedLens = featureByIdIsLoadedLens(MONGO);

const modelsLens = lens(
  prop(MODELS),
  useWith(assoc(MODELS), [esModuleValues, identity]),
);
const metaModelsLens = compose(sharedLens, modelsLens);

const getMongoConfig = view(configFeaturesMongoLens);

const isMongoLoaded = view(isMongoLoadedLens);

const shareMongoModels = set(metaModelsLens);
const getSharedModels = view(metaModelsLens);

const getDefaultMongoWeave = view(defaultMongoLens);

const getSchema = prop(SCHEMA);

export {
  mongoLens,
  configFeaturesMongoLens,
  featuresMongoLens,
  defaultMongoLens,
  isMongoLoadedLens,
  modelsLens,
  metaModelsLens,
};

export {
  getMongoConfig,
  isMongoLoaded,
  shareMongoModels,
  getSharedModels,
  getDefaultMongoWeave,
  getSchema,
};
