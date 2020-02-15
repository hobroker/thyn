import debug from 'debug';
import { apply, bind, pipe, tap, unapply } from 'ramda';
import { THYN } from '../constants';

const baseDebug = debug(THYN);

const extend = bind(baseDebug.extend, baseDebug);

export const createDebug = pipe(extend, apply, unapply);

export const debugIt = baseDebug;

export const debugItFp = tap(createDebug('fp'));
