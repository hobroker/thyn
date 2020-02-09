import debug from 'debug';
import { apply, compose, tap, unapply } from 'ramda';

const baseDebug = debug('oxium');

export const debugIt = baseDebug;
export const debugIt2 = key => (...args) => debugIt(key, ...args);

export const createDebug = compose(
  unapply,
  apply,
  debugIt.extend.bind(debugIt),
);

export const debugItFp = tap(createDebug('fp'));
