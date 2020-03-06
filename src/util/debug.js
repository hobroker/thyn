import debug from 'debug';
import createDebug from 'oxium/src/util/debug';
import { THYN } from '../constants';

const baseDebug = debug(THYN);

export const debugIt = createDebug(baseDebug);
