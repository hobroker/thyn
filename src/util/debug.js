import debug from 'debug';
import { apply, compose, tap, unapply } from 'ramda';

const baseDebug = debug('oxium');

const debugIt = baseDebug;

const createDebug = compose(unapply, apply, ::debugIt.extend);

const debugItFp = tap(createDebug('fp'));

export { createDebug, debugIt, debugItFp };
