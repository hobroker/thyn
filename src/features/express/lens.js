import {
  assoc,
  compose,
  defaultTo,
  identity,
  lens,
  lensProp,
  map,
  mergeAll,
  prop,
  set,
  useWith,
  view,
} from 'ramda';
import {
  featureByIdIsLoadedLens,
  featureByIdLens,
  getFeatures,
} from '../../lens/app';
import { configFeaturesLens } from '../../lens/config';
import { sharedLens } from '../../lens/feature';
import { EXPRESS, ROUTES } from './constants';
import deepDestruct from '../../util/deepDestruct';

export const expressLens = lensProp(EXPRESS);
export const featureExpressLens = featureByIdLens(EXPRESS);
export const isExpressLoadedLens = featureByIdIsLoadedLens(EXPRESS);
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

export const isExpressLoaded = view(isExpressLoadedLens);

export const getSharedRoutes = view(metaRoutesLens);
export const setRoutes = set(metaRoutesLens);

export const getAllRoutes = compose(
  mergeAll,
  map(getSharedRoutes),
  getFeatures,
);
