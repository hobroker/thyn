import { curry } from 'ramda';

const tapThrow = curry((fn, arg) => {
  fn(arg);

  throw arg;
});

export default tapThrow;
