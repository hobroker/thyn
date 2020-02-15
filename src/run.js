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
import execApp from './util/execApp';
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

const run = curry((root, apps) =>
  pipe(
    prepare,
    runApp,
    andThen(pipe(onDone, execApp(apps))),
    otherwise(onFail),
  )(root),
);

export default run;
