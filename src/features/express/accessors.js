import { assocM } from 'oxium';
import {
  compose,
  curry,
  filter,
  lens,
  map,
  mergeDeepRight,
  not,
  pipe,
  prop,
  set,
  view,
} from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { getConfigFeatures } from '../../accessors/config';
import { getFeatures } from '../../accessors/root';
import { EXPRESS, ROUTES } from './constants';

export const routesLens = lens(
  prop(ROUTES),
  curry((data, target) => {
    const routes = mergeDeepRight(target[ROUTES] || {}, data);

    return assocM(ROUTES, routes, target);
  }),
);
export const addRoutes = set(routesLens);
export const getRoutes = view(routesLens);

export const getExpressConfig = pipe(getConfigFeatures, prop(EXPRESS));

export const getAllRoutes = pipe(
  getFeatures,
  map(getRoutes),
  filter(compose(not, isNilOrEmpty)),
);
