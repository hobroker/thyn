import { isNotUndefined } from 'ramda-adjunct';
import { __, compose, curry, prop } from 'ramda';

const hasRequiredFeatures = curry((featureKeys, oxi) =>
  featureKeys.every(compose(isNotUndefined, prop(__, oxi))),
);

export default hasRequiredFeatures;
