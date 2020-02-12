import { getFeatures } from 'oxium';
import { chain, map, mergeAll, pipe } from 'ramda';
import { getCli, getSharedModels } from './feature';
import deepDestruct from '../util/deepDestruct';

export const getAllModels = pipe(
  getFeatures,
  map(getSharedModels),
  deepDestruct,
  mergeAll,
);

export const getAllClis = pipe(
  getFeatures,
  chain(getCli),
  deepDestruct,
  mergeAll,
);
