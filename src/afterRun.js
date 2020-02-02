import { compose, converge, map } from 'ramda';
import { getMeta, getWeave } from './lens/feature';
import { getFeatures } from './lens/app';
import { debugItFp } from './util/debug';

const afterRun = compose(
  map(converge(debugItFp, [getMeta, getWeave])),
  getFeatures,
);

export default afterRun;
