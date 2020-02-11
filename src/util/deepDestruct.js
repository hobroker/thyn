import { cond, identity, map, mapObjIndexed, T, when } from 'ramda';
import { isArray, isObjectLike, Y } from 'ramda-adjunct';

const deepDestruct = Y(fn =>
  cond([
    [isArray, map(when(isObjectLike, fn))],
    [isObjectLike, mapObjIndexed(when(isObjectLike, fn))],
    [T, identity],
  ]),
);

export default deepDestruct;
