import oxium, { areAppFeaturesLoaded, isFeatureUnloaded } from 'oxium';
import {
  andThen,
  evolve,
  filter,
  map,
  otherwise,
  pipe,
  take,
  tap,
  values,
} from 'ramda';
import { createDebug } from './util/debug';
import { parseArgv } from './util/argv';
import { prepareRawFeature } from './lens/feature';

const debugIt = createDebug('run');

const onDone = pipe(tap(() => debugIt('running')));
const onFail = pipe(debugIt);

const filterFn = pipe(filter(isFeatureUnloaded), take(2));
const isDoneFn = areAppFeaturesLoaded;

const prepare = evolve({
  features: pipe(values, map(prepareRawFeature)),
  argv: parseArgv,
});

const runApp = oxium(filterFn, isDoneFn);

const run = pipe(prepare, runApp, andThen(onDone), otherwise(onFail));

export default run;
