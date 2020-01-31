import { compose, converge, filter, map, take } from 'ramda';
import oxium from 'oxium';
import { getFeatures, resetMetaToFeature } from './lens/app';
import { areAllFeaturesLoaded } from './lens/features';
import { getMeta, getWeave, isFeatureUnloaded } from './lens/feature';
import config from './config';
import Demo from './features/demo';
import Second from './features/second';
import Mongo from './features/mongo';
import { debugIt, debugItFp } from './util/debug';

const features = [Demo, Mongo, Second];
const app = resetMetaToFeature(features, { config });

const filterFn = compose(take(2), filter(isFeatureUnloaded));
const isDoneFn = compose(areAllFeaturesLoaded, getFeatures);
const run = oxium(filterFn, isDoneFn);

run(app)
  .then(compose(map(converge(debugItFp, [getMeta, getWeave])), getFeatures))
  .catch(debugIt);
