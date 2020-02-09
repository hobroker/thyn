import { cond, identity, map, mapObjIndexed, T, when } from 'ramda';
import { isArray, isObject, isFunction } from 'ramda-adjunct';

const deepDestruct = value => {
  const destructWhenNeeded = when(isObject, deepDestruct);

  return cond([
    [isFunction, identity],
    [isArray, map(destructWhenNeeded)],
    [isObject, mapObjIndexed(destructWhenNeeded)],
    [T, identity],
  ])(value);
};

export default deepDestruct;
