import { compose, identity, path, prop, useWith } from 'ramda';
import { assocPathM } from 'oxium';
import { STORE } from './constants';

export const getStore = prop(STORE);

export const createAccessor = targetPath => [
  compose(path(targetPath), getStore),
  useWith(assocPathM(targetPath), [identity, getStore]),
];
