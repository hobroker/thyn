import { compose, prop } from 'ramda';
import { gtNow } from '../../util/date';

export const isTokenValid = compose(gtNow, prop('expiresAt'));
