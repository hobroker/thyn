import debug from 'debug';
import { apply, bind, pipe, tap, unapply } from 'ramda';
import { PKG_NAME } from '../constants';

const baseDebug = debug(PKG_NAME);

const extend = bind(baseDebug.extend, baseDebug);

export const createDebug = pipe(extend, apply, unapply);

export const debugIt = baseDebug;

export const debugItFp = tap(createDebug('fp'));
