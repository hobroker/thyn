import debug from 'debug';
import { apply, compose, unapply } from 'ramda';

const baseDebug = debug('app');

export const debugIt = baseDebug;

export const createDebug = compose(unapply, apply, ::debugIt.extend);

export const debugItFp = createDebug('fp');
