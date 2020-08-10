import { SPOTIFY } from '../constants';
import { get } from '../../express/methods';
import { spotifyLogin } from '../resolvers/auth';
import { getReqUserId } from '../../user/accessors';
import SpotifyClient from '../api';

export const auth = (oxi, { res, req }) => {
  const spotify = new SpotifyClient(oxi);
  const userId = getReqUserId(req);
  const redirectUrl = spotify.generateAuthorizeURL({ userId });

  return res.redirect(redirectUrl);
};

export const authCallback = (oxi, { req: { query } }) => {
  const { code, state } = query;

  return oxi(spotifyLogin({ code, state }));
};

export default {
  [SPOTIFY]: {
    auth: {
      '/': get(auth),
      callback: get(authCallback),
    },
  },
};
