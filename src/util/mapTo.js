import {
  always,
  applyTo,
  assoc,
  compose,
  cond,
  converge,
  curry,
  identity,
  nthArg,
  prop,
  reduce,
  T,
  toPairs,
} from 'ramda';
import { isFunction, isObject, isString, stubObj } from 'ramda-adjunct';

const reduceObjIndexed = curry((fn, acc, obj) =>
  compose(
    reduce((result, [key, value]) => fn(result, value, key, obj), acc),
    toPairs,
  )(obj),
);

const findTransformer = recursiveFn =>
  cond([
    [isFunction, identity],
    [isObject, recursiveFn],
    [isString, prop],
    [T, always],
  ]);

const mapTo = curry((spec, object) =>
  reduceObjIndexed(
    converge(assoc, [
      nthArg(2),
      compose(applyTo(object), findTransformer(mapTo), nthArg(1)),
      nthArg(0),
    ]),
    stubObj(),
    spec,
  ),
);

export default mapTo;
