import { always, unless } from 'ramda';

const protectValue = unless(
  () => process.env.NODE_ENV === 'development',
  always('***'),
);

export default protectValue;
