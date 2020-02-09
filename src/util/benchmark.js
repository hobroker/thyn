import { always, compose } from 'ramda';
import { debugIt } from './debug';

const hrTimeToMs = ([seconds, nanoseconds]) =>
  Number(seconds * 1000 + nanoseconds / 10 ** 6);

export const measureTime = () =>
  compose(hrTimeToMs, process.hrtime, always(process.hrtime()));

export const debugItTime = () => {
  const measure = measureTime();

  return () => {
    const ms = measure();
    debugIt(`${ms}ms`);

    return ms;
  };
};
