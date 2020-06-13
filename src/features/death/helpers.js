import { applyTo, compose, prop } from 'ramda';

export const whenDying = fn => compose(applyTo(fn), prop('death'));
