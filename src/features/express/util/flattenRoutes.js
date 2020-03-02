import {
  anyPass,
  assoc,
  call,
  chain,
  curry,
  evolve,
  ifElse,
  map,
  pipe,
  toPairs,
} from 'ramda';
import { appendFlipped, ensureArray, isArray, isFunction } from 'ramda-adjunct';
import concatPaths from './concatPaths';

const prepareRoute = key =>
  pipe(ensureArray, map(pipe(call, assoc('path', concatPaths([key])))));

const prepareRoutes = curry((fn, key) =>
  pipe(
    fn,
    map(
      evolve({
        path: pipe(appendFlipped([key]), concatPaths),
      }),
    ),
  ),
);

const flattenRoutes = pipe(
  toPairs,
  chain(([key, value]) =>
    ifElse(
      anyPass([isArray, isFunction]),
      prepareRoute(key),
      prepareRoutes(flattenRoutes, key),
    )(value),
  ),
);

export default flattenRoutes;
