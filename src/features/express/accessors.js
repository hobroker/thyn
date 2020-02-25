import { lensPathM } from 'oxium';
import { compose, filter, map, not, pipe, prop, set, view } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { EXPRESS, ROUTES } from './constants';
import { getConfigFeatures } from '../../accessors/config';
import { getFeatures } from '../../accessors/root';

export const routesLens = lensPathM([ROUTES]);
export const setRoutes = set(routesLens);
export const getRoutes = view(routesLens);

export const getExpressConfig = pipe(getConfigFeatures, prop(EXPRESS));

export const getAllRoutes = pipe(
  getFeatures,
  map(getRoutes),
  filter(compose(not, isNilOrEmpty)),
);
