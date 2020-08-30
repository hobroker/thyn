import { withResolver } from '../../apollo/helpers';
// import { getLatestToken } from '../resolvers/token';

import { registerWithToken } from '../resolvers/auth';

export default {
  Mutation: {
    connectWithSpotify: withResolver(({ args }) => oxi => {
      const { accessToken } = args;

      return oxi(registerWithToken({ accessToken }));
    }),
  },
};
