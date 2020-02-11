import oxium, { areAppFeaturesLoaded, isFeatureUnloaded } from 'oxium';
import {
  andThen,
  compose,
  evolve,
  filter,
  map,
  otherwise,
  pipe,
  take,
  values,
} from 'ramda';
import { createDebug } from './util/debug';
import { isOnValidEnv, prepareRawFeature } from './lens/feature';

const debugIt = createDebug('app');

const verifyEnv = compose(filter, isOnValidEnv);

const prepareFeatures = env =>
  pipe(values, map(prepareRawFeature), verifyEnv(env));

const filterFn = pipe(filter(isFeatureUnloaded), take(2));
const isDoneFn = areAppFeaturesLoaded;

const runApp = oxium(filterFn, isDoneFn);

const runWith = ({ env, ...rest }) =>
  pipe(
    evolve({
      features: prepareFeatures(env),
    }),
    runApp,
    andThen(() => debugIt('running')),
    otherwise(debugIt),
  )({ env, ...rest });

export default runWith;
