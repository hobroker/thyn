import { assocM } from 'oxium';
import { compose, curry, filter, map, mergeDeepRight, not, prop } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { getConfigFeatures } from '../../accessors/config';
import { EXPRESS, ROUTES } from './constants';

export const getExpress = prop(EXPRESS);

export const addRoutes = curry((data, target) => {
  const routes = mergeDeepRight(target[ROUTES] || {}, data);

  return assocM(ROUTES, routes, target);
});

export const getExpressConfig = compose(getExpress, getConfigFeatures);

export const getAllRoutes = compose(
  filter(compose(not, isNilOrEmpty)),
  map(prop(ROUTES)),
);
