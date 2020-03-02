import { invariant } from 'oxium';
import { AUTH_SCOPES } from '../constants';
import tokenFacade from '../facades/token';
import { getLatestToken } from './db';
import { isTokenValid } from '../models/SpotifyAccessToken';

export const generateAuthorizationUrl = redirectURI => oxi => {
  const { spotify } = oxi;

  spotify.setRedirectURI(redirectURI);

  const url = spotify.createAuthorizeURL(AUTH_SCOPES, 'null', false);

  return url;
};

export const getTokenByCode = code => ({ spotify }) =>
  spotify.authorizationCodeGrant(code).then(tokenFacade);

export const ensureTokenIsValid = () => async oxi => {
  const { spotify } = oxi;
  const token = await oxi(getLatestToken());

  invariant(token, 'manual auth required');

  spotify.setRefreshToken(token.refreshToken);

  if (!isTokenValid(token)) {
    const { accessToken, expiresAt } = await spotify
      .refreshAccessToken()
      .then(tokenFacade);
    await token.updateOne({ accessToken, expiresAt });
    spotify.setAccessToken(accessToken);
  } else {
    spotify.setAccessToken(token.accessToken);
  }
};
