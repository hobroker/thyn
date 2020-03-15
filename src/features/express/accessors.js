import { assocM } from 'oxium';
import {
  compose,
  curry,
  filter,
  map,
  mergeDeepRight,
  not,
  pipe,
  prop,
} from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { getConfigFeatures } from '../../accessors/config';
import { EXPRESS, ROUTES } from './constants';

export const addRoutes = curry((data, target) => {
  const routes = mergeDeepRight(target[ROUTES] || {}, data);

  return assocM(ROUTES, routes, target);
});

export const getExpressConfig = pipe(getConfigFeatures, prop(EXPRESS));

export const getAllRoutes = pipe(
  map(prop(ROUTES)),
  filter(compose(not, isNilOrEmpty)),
);
