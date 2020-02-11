import { getFeatures, setFeatures } from 'oxium';
import {
  applyTo,
  compose,
  identity,
  map,
  mergeAll,
  pipe,
  useWith,
  values,
  when,
} from 'ramda';
import { isFunction } from 'ramda-adjunct';
import { getSharedModels, setDefaultMeta } from './feature';
import deepDestruct from '../util/deepDestruct';

export const resetMetaToFeatures = useWith(setFeatures, [
  pipe(values, map(when(isFunction, applyTo({}))), map(setDefaultMeta)),
  identity,
]);

export const geAllModels = compose(
  deepDestruct,
  mergeAll,
  map(getSharedModels),
  getFeatures,
);
