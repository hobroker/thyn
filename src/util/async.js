import { applyTo, compose, not, when } from 'ramda';
import { isPromise } from 'ramda-adjunct';

export const promiseAll = array => Promise.all(array);

export const toPromise = value => Promise.resolve(value);

export const ensurePromise = when(compose(not, isPromise), toPromise);

export const wait = ms => new Promise(r => setTimeout(applyTo(ms, r), ms));
