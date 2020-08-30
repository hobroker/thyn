import { compose } from 'ramda';
import { SPOTIFY } from '../constants';
import { get, post } from '../../express/methods';
import { registerWithToken, spotifyLogin } from '../resolvers/auth';
import { getReqUserId } from '../../user/accessors';
import SpotifyClient from '../api';
import { getCallbackHtmlContent } from '../accessors';
import { readFile } from '../../../util/file';

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

export const registerWithSpotify = (oxi, { req: { body } }) => {
  const { accessToken } = body;

  return oxi(registerWithToken({ accessToken }));
};

const callback2 = compose(readFile, getCallbackHtmlContent);

export default {
  [SPOTIFY]: {
    auth: {
      '/': get(auth),
      callback: get(authCallback),
      register: post(registerWithSpotify),
      callback2: get(callback2),
    },
  },
};
