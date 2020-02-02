import { always, compose } from 'ramda';
import { debugIt } from './debug';

const hrTimeToMs = ([seconds, nanoseconds]) =>
  Number(seconds * 1000 + nanoseconds / 10 ** 6);

const measureTime = () =>
  compose(hrTimeToMs, process.hrtime, always(process.hrtime()));

const debugItTime = () => {
  const measure = measureTime();

  return () => {
    const ms = measure();
    debugIt(`${ms}ms`);

    return ms;
  };
};

export { debugItTime };
