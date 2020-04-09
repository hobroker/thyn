import { compose, prop } from 'ramda';
import { gtNow } from '../../../util/date';

const isTokenValid = compose(gtNow, prop('expiresAt'));

export default isTokenValid;
