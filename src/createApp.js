import oxium from 'oxium';
import { always, andThen, filter, otherwise, pipe, take } from 'ramda';
import { createDebug } from './util/debug';
import { areAppFeaturesLoaded, resetMetaToFeatures } from './lens/app';
import { isFeatureUnloaded } from './lens/feature';

const debugIt = createDebug('app');

const filterFn = pipe(filter(isFeatureUnloaded), take(2));
const isDoneFn = areAppFeaturesLoaded;

const runApp = oxium(filterFn, isDoneFn);

const createApp = ({ config, features }) => {
  const app = resetMetaToFeatures(features, { config });

  return pipe(
    always(app),
    runApp,
    andThen(() => debugIt('running')),
    otherwise(debugIt),
  );
};

export default createApp;
