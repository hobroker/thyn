import { cond, identity, map, mapObjIndexed, T, when } from 'ramda';
import { isArray, isObject } from 'ramda-adjunct';

const deepDestruct = value => {
  const _destructIfNeeded = when(isObject, deepDestruct);

  return cond([
    [isArray, map(_destructIfNeeded)],
    [isObject, mapObjIndexed(_destructIfNeeded)],
    [T, identity],
  ])(value);
};

export default deepDestruct;
