import tokenFacade from '../facades/token';
import { getLatestToken, saveToken } from './token';
import invariant from '../../../util/invariant';
import isTokenValid from '../util/isTokenValid';
import { getSpotify, getSpotifyConfig } from '../accessors';
import { AUTH_SCOPES } from '../constants';
import { syncSpotifyUser } from './user';
import { generateToken } from '../../user/resolvers/token';

export const getAuthorizeURL = () => oxi => {
  const spotify = getSpotify(oxi);
  const { redirectURL } = getSpotifyConfig(oxi);
  spotify.setRedirectURI(redirectURL);

  return spotify.createAuthorizeURL(AUTH_SCOPES);
};

export const getTokenByCode = code => ({ spotify }) =>
  spotify.authorizationCodeGrant(code).then(tokenFacade);

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

export const spotifyLogin = ({ code }) => async oxi => {
  const data = await oxi(getTokenByCode(code));
  const user = await oxi(syncSpotifyUser(data));
  const userId = user._id;

  await oxi(
    saveToken({
      ...data,
      userId,
    }),
  );

  return oxi(generateToken({ userId }));
};
