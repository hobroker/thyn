import { cond, identity, map, mapObjIndexed, T, when } from 'ramda';
import { isArray, isObject, isFunction } from 'ramda-adjunct';

const deepDestruct = value => {
  const _destructIfNeeded = when(isObject, deepDestruct);

  return cond([
    [isFunction, identity],
    [isArray, map(_destructIfNeeded)],
    [isObject, mapObjIndexed(_destructIfNeeded)],
    [T, identity],
  ])(value);
};

export default deepDestruct;
