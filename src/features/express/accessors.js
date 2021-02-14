import {
  compose,
  curry,
  filter,
  map,
  mergeDeepRight,
  not,
  nthArg,
  prop,
} from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { getConfigFeatures } from '../../accessors/config';
import { EXPRESS, MIDDLEWARES, ROUTES } from './constants';
import { assocM } from '../../util/mutable';

export const getExpress = prop(EXPRESS);

export const addRoutes = curry((data, target) => {
  const routes = mergeDeepRight(target[ROUTES] || {}, data);

  return assocM(ROUTES, routes, target);
});

export const addMiddlewares = assocM(MIDDLEWARES);

export const getExpressConfig = compose(getExpress, getConfigFeatures);

export const getAllRoutes = compose(
  filter(compose(not, isNilOrEmpty)),
  map(prop(ROUTES)),
);

export const getResolverReq = compose(prop('req'), nthArg(1));
