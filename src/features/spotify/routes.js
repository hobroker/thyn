import { SPOTIFY } from './constants';
import { get } from '../express/methods';
import getBaseUrl from '../express/util/getBaseUrl';
import { generateAuthorizationUrl } from './auth';
import { getSpotifyConfig } from './accessors';

export const prefix = `${SPOTIFY}/auth`;

const auth = (root, { req }) => {
  const config = getSpotifyConfig(root);
  const wSpotify = 1; // getDefaultSpotifyWeave(root);
  const redirectURI = getBaseUrl(req) + config.auth.redirectPath;

  return wSpotify(generateAuthorizationUrl(redirectURI));
  // const { spotifyAuth } = this.services;
  // const redirectUrl = spotifyAuth.generateAuthorizationUrl({
  //   baseUrl: getBaseUrl(req),
  // });
  //
  // return res.redirect(redirectUrl);
};

const authCallback = (root, { req }) => {
  const { spotifyAuth } = this.services;
  const { code } = req.query;

  return spotifyAuth.registerTokenByCode(code);
};

export const routes = [get('/', auth), get('/callback', authCallback)];
