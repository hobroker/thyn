import { featuresLens, metaLens } from 'oxium';
import { compose, map, mergeAll, pipe, view } from 'ramda';
import { getModels } from './feature';
import deepDestruct from '../util/deepDestruct';

export const getFeatures = view(compose(metaLens, featuresLens));
export const getAllModels = pipe(
  getFeatures,
  map(pipe(getModels, deepDestruct)),
  mergeAll,
);
