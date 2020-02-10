import {
  assoc,
  compose,
  defaultTo,
  filter,
  identity,
  lens,
  lensProp,
  map,
  not,
  prop,
  set,
  useWith,
  view,
} from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { getFeatures } from 'oxium';
import { configFeaturesLens } from '../../lens/config';
import { sharedLens } from '../../lens/feature';
import { EXPRESS, ROUTES } from './constants';
import deepDestruct from '../../util/deepDestruct';

export const expressLens = lensProp(EXPRESS);

export const configFeaturesExpressLens = compose(
  configFeaturesLens,
  expressLens,
);

export const routesLens = lens(
  compose(defaultTo({}), prop(ROUTES)),
  useWith(assoc(ROUTES), [deepDestruct, identity]),
);

export const getExpressConfig = view(configFeaturesExpressLens);

export const metaRoutesLens = compose(sharedLens, routesLens);

export const getSharedRoutes = view(metaRoutesLens);

export const shareRoutes = set(metaRoutesLens);

export const getAllRoutes = compose(
  filter(compose(not, isNilOrEmpty)),
  map(getSharedRoutes),
  getFeatures,
);
