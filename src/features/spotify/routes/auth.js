import { SPOTIFY } from '../constants';
import { get } from '../../express/methods';
import { getAuthorizeURL, spotifyLogin } from '../resolvers/auth';
import { isLatestTokenValid } from '../resolvers/token';
import { getMongo } from '../../mongo/accessors';

export const auth = (oxi, { res }) => {
  const redirectUrl = oxi(getAuthorizeURL());

  return res.redirect(redirectUrl);
};

export const authCallback = (oxi, { req: { query } }) => {
  const { code } = query;

  return oxi(spotifyLogin({ code }));
};

export const ping = oxi => {
  const mongo = getMongo(oxi);

  return mongo(isLatestTokenValid());
};

export default {
  [SPOTIFY]: {
    auth: {
      '/': get(auth),
      callback: get(authCallback),
      ping: get(ping),
    },
  },
};
