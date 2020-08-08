import { findLatest } from '../../mongo/helpers';
import isTokenValid from '../util/isTokenValid';
import invariant from '../../../util/invariant';
import tokenFacade from '../facades/token';

export const saveToken = data => ({ mongo: { SpotifyAccessToken } }) =>
  SpotifyAccessToken.create(data);

export const getLatestToken = () => async ({ mongo: { SpotifyAccessToken } }) =>
  findLatest(SpotifyAccessToken);

export const getLatestTokenByUserId = ({ user: { _id } }) => async ({
  mongo: { SpotifyAccessToken },
}) =>
  findLatest(SpotifyAccessToken, {
    userId: _id,
  });

export const ensureTokenIsValid = () => async oxi => {
  const { spotify } = oxi;
  const token = await oxi(getLatestToken());

  invariant(token, 'manual auth required');

  if (!isTokenValid(token)) {
    spotify.setRefreshToken(token.refreshToken);
    const { accessToken, expiresAt } = await spotify
      .refreshAccessToken()
      .then(tokenFacade);
    await token.updateOne({ accessToken, expiresAt });
    spotify.setAccessToken(accessToken);
  } else {
    spotify.setAccessToken(token.accessToken);
  }
};
