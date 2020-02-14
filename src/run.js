import invariant from 'oxium/src/util/invariant';
import oxium, { areAppFeaturesLoaded, isFeatureUnloaded } from 'oxium';
import {
  andThen,
  curry,
  evolve,
  filter,
  map,
  otherwise,
  pipe,
  take,
  tap,
  values,
} from 'ramda';
import { isFunction } from 'ramda-adjunct';
import { createDebug } from './util/debug';
import { prepareRawFeature } from './lens/feature';
import { getExecArgv } from './lens/app';
import * as apps from './apps';

const debugIt = createDebug('run');

const execApp = curry((items, root) => {
  const execArgv = getExecArgv(root);
  const execItem = items[execArgv];
  invariant(isFunction(execItem), `execItem ${execArgv} not found`);

  debugIt('executing %s app', execArgv);

  return execItem(root);
});

const onDone = pipe(
  tap(() => debugIt('running')),
  execApp(apps),
);
const onFail = pipe(debugIt);

const filterFn = pipe(filter(isFeatureUnloaded), take(2));
const isDoneFn = areAppFeaturesLoaded;

const prepare = evolve({
  features: pipe(values, map(prepareRawFeature)),
});

const runApp = oxium(filterFn, isDoneFn);

const run = pipe(prepare, runApp, andThen(onDone), otherwise(onFail));

export default run;
