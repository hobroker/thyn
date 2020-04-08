import { AUTH_SCOPES } from '../constants';
import tokenFacade from '../facades/token';
import { getLatestToken } from './token';
import { isTokenValid } from '../helpers';
import invariant from '../../../util/invariant';

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
