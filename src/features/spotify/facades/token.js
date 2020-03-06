import { identity, pipe, prop, when } from 'ramda';
import mapTo from '../../../util/mapTo';
import { toDate } from '../../../util/date';

const tokenFacade = when(
  identity,
  pipe(
    prop('body'),
    mapTo({
      refreshToken: 'refresh_token',
      accessToken: 'access_token',
      expiresAt: pipe(
        prop('expires_in'),
        seconds => new Date().getTime() + seconds * 1000,
        toDate,
      ),
    }),
  ),
);

export default tokenFacade;