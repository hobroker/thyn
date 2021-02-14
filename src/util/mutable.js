import { assocPath, curry } from 'ramda';

export const assocPathM = curry((propPath, value, target) => {
  const [first] = propPath;
  const tmp = assocPath(propPath, value, {});
  // eslint-disable-next-line no-param-reassign
  target[first] = tmp[first];

  return target;
});

export const assocM = curry((key, value, target) =>
  assocPathM([key], value, target),
);
