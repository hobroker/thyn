import { curry } from 'ramda';

const withConstraint = curry((constraint, reject, resolve) => (...args) => {
  if (constraint(...args)) {
    return resolve(...args);
  }

  return reject(...args);
});

export default withConstraint;
