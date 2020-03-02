import { featuresLens, lensPathM, metaLens } from 'oxium';
import { compose, map, mergeAll, pipe, view } from 'ramda';
import { getModels } from './feature';
import deepDestruct from '../util/deepDestruct';
import { CONFIG } from '../constants';

export const configLens = lensPathM([CONFIG]);

export const getFeatures = view(compose(metaLens, featuresLens));
export const getAllModels = pipe(
  getFeatures,
  map(pipe(getModels, deepDestruct)),
  mergeAll,
);
