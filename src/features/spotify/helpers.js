import { gt, identity, ifElse, not, pipe, prop } from 'ramda';

export const isTokenValid = ifElse(
  identity,
  pipe(prop('expiresAt'), gt(new Date()), not),
  Boolean,
);
