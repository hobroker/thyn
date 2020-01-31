import {
  always,
  apply,
  applyTo,
  compose,
  converge,
  curry,
  identity,
  ifElse,
  then,
  useWith,
} from 'ramda';
import { cata, ensureArray, isFunction } from 'ramda-adjunct';
import { getHandler, setFeatureIsLoaded } from '../lens/feature';
import { ensureEitherOrRight } from './either';
import { ensurePromise } from './async';

const rightResultMap = converge(compose, [
  always(setFeatureIsLoaded(true)),
  ifElse(isFunction, identity, always(identity)),
]);

const leftResultMap = always(identity);

const resolveHandler = curry((app, handler) =>
  compose(then(ensureEitherOrRight), ensurePromise, handler)(app),
);

const callFeatureWith = curry((app, feature) =>
  compose(resolveHandler(app), getHandler)(feature),
);

const foldHandlerResult = useWith(apply, [
  cata(leftResultMap, rightResultMap),
  ensureArray,
]);

const applyFeatureTo = curry((app, feature) =>
  callFeatureWith(app, feature)
    .then(foldHandlerResult)
    .then(applyTo(feature)),
);

export default applyFeatureTo;
