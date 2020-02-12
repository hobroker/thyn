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
  tap,
  values,
  when,
} from 'ramda';
import { createDebug } from './util/debug';
import { isOnValidEnv, prepareRawFeature } from './lens/feature';
import runCli, { shouldRunCli } from './runCli';

const debugIt = createDebug('app');

const filterByEnv = compose(filter, isOnValidEnv);

const prepareFeatures = env =>
  pipe(values, map(prepareRawFeature), filterByEnv(env));

const onDone = pipe(
  tap(() => debugIt('running')),
  when(shouldRunCli, runCli),
);
const onFail = pipe(debugIt);

const filterFn = pipe(filter(isFeatureUnloaded), take(2));
const isDoneFn = areAppFeaturesLoaded;

const runApp = oxium(filterFn, isDoneFn);

const runWith = ({ env, ...rest }) =>
  pipe(
    evolve({
      features: prepareFeatures(env),
    }),
    runApp,
    andThen(onDone),
    otherwise(onFail),
  )({ env, ...rest });

export default runWith;
