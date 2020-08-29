import { compose, converge, prop, useWith } from 'ramda';
import { SPOTIFY } from '../constants';
import { get } from '../../express/methods';
import { spotifyLogin } from '../resolvers/auth';
import { getReqUserId } from '../../user/accessors';
import SpotifyClient from '../api';
import { getCallbackHtmlContent } from '../accessors';
import { readFile } from '../../../util/file';
import { OK } from 'http-status-codes';

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

const callback2 = compose(readFile, getCallbackHtmlContent);

export default {
  [SPOTIFY]: {
    auth: {
      '/': get(auth),
      callback: get(authCallback),
      callback2: get(callback2),
    },
  },
};
