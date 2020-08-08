import tokenFacade from '../facades/token';
import { saveToken } from './token';
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

const getTokenByCode = code => ({ spotify }) =>
  spotify.authorizationCodeGrant(code).then(tokenFacade);

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
