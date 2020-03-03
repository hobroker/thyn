import { SPOTIFY } from '../constants';
import { get } from '../../express/methods';
import getBaseUrl from '../../express/util/getBaseUrl';
import { generateAuthorizationUrl, getTokenByCode } from '../resolvers/auth';
import { isLatestTokenValid, saveToken } from '../resolvers/token';
import { getSpotifyConfig } from '../accessors';

const auth = (oxi, { req, res }) => {
  const config = getSpotifyConfig(oxi);
  const redirectURI = getBaseUrl(req) + config.auth.redirectPath;

  const redirectUrl = oxi(generateAuthorizationUrl(redirectURI));

  return res.redirect(redirectUrl);
};

const authCallback = async (oxi, { req }) => {
  const { code } = req.query;

  const data = await oxi(getTokenByCode(code));

  return oxi(saveToken(data));
};

const ping = ({ mongo }) => mongo(isLatestTokenValid());

export default {
  [SPOTIFY]: {
    auth: {
      '/': get(auth),
      callback: get(authCallback),
      ping: get(ping),
    },
  },
};
