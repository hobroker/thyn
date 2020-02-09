import { compose, join, replace } from 'ramda';
import { trimCharsEnd } from 'ramda-adjunct';

const concatPaths = compose(
  trimCharsEnd('/'),
  replace(/\/{2,}/g, '/'),
  join('/'),
);

export default concatPaths;
