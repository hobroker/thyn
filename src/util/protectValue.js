import { always, propEq, unless } from 'ramda';

const protectValue = unless(
  () => propEq('NODE_ENV', 'development', process.env),
  always('***'),
);

export default protectValue;
