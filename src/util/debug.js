import debug from 'debug';
import { bind } from 'ramda';
import { createDebug } from 'oxium/src/util/debug';
import { THYN } from '../constants';

const baseDebug = debug(THYN);

const extend = bind(baseDebug.extend, baseDebug);

export const debugIt = createDebug(extend);
