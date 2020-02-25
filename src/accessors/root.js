import { lensPathM } from 'oxium';
import { FEATURES, META } from 'oxium/src/constants';
import { map, mergeAll, path, pipe } from 'ramda';
import { getModels } from './feature';
import deepDestruct from '../util/deepDestruct';
import { CONFIG } from '../constants';

export const configLens = lensPathM([CONFIG]);

export const getFeatures = path([META, FEATURES]);
export const getAllModels = pipe(
  getFeatures,
  map(pipe(getModels, deepDestruct)),
  mergeAll,
);
