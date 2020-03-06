import { curry } from 'ramda';

const tapThrow = curry((arg, fn) => {
  fn(arg);

  throw arg;
});

export default tapThrow;
