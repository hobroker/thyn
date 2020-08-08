import { SPOTIFY } from '../constants';
import { get } from '../../express/methods';
import { getAuthorizeURL, spotifyLogin } from '../resolvers/auth';

export const auth = (oxi, { res }) => {
  const redirectUrl = oxi(getAuthorizeURL());

  return res.redirect(redirectUrl);
};

export const authCallback = (oxi, { req: { query } }) => {
  const { code } = query;

  return oxi(spotifyLogin({ code }));
};

export default {
  [SPOTIFY]: {
    auth: {
      '/': get(auth),
      callback: get(authCallback),
    },
  },
};
