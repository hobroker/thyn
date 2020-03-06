import { isUndefined } from 'ramda-adjunct';

export const isRightApp = (env, value) => isUndefined(value) || env === value;
