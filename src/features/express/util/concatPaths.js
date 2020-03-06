import { compose, join, replace, when } from 'ramda';
import { trimCharsEnd, lengthGt } from 'ramda-adjunct';

const concatPaths = compose(
  when(lengthGt(1), trimCharsEnd('/')),
  replace(/\/{2,}/g, '/'),
  join('/'),
);

export default concatPaths;
