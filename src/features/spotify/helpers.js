import { identity, ifElse, not, pipe, prop } from 'ramda';
import { gtNow } from '../../util/date';

export const isTokenValid = ifElse(
  identity,
  pipe(prop('expiresAt'), gtNow, not),
  Boolean,
);
