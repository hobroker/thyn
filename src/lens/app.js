import { getFeatures } from 'oxium';
import { defaultTo, map, mergeAll, path, pipe } from 'ramda';
import { getSharedModels } from './feature';
import deepDestruct from '../util/deepDestruct';

export const getAllModels = pipe(
  getFeatures,
  map(getSharedModels),
  deepDestruct,
  mergeAll,
);

export const getExecArgv = pipe(path(['argv', 'exec']), defaultTo('default'));
