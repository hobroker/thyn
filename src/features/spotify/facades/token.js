import { identity, pipe, prop, when } from 'ramda';
import mapTo from '../../../util/mapTo';

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
        seconds => new Date(seconds),
      ),
    }),
  ),
);

export default tokenFacade;
