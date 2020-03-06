import { applyTo, pipe, prop } from 'ramda';

export const whenDying = fn => pipe(prop('death'), applyTo(fn));
