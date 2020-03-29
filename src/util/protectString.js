import { compose, join, length, propEq, repeat, unless } from 'ramda';

const protectString = unless(
  () => propEq('NODE_ENV', 'development', process.env),
  compose(join(''), repeat('*'), length, String),
);

export default protectString;
