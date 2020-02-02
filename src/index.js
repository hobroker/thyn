import oxium from 'oxium';
import { compose, filter, otherwise, take, then } from 'ramda';
import { areAppFeaturesLoaded, resetMetaToFeatures } from './lens/app';
import { isFeatureUnloaded } from './lens/feature';
import afterRun from './util/afterRun';
import { debugIt } from './util/debug';
import config from './config';
import * as features from './features';

const app = resetMetaToFeatures(features, { config });

const filterFn = compose(take(2), filter(isFeatureUnloaded));
const run = oxium(filterFn, areAppFeaturesLoaded);

compose(otherwise(debugIt), then(afterRun), run)(app);
