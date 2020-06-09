import dotenv from 'dotenv';
import { defaultTo } from 'ramda';
import { MONGO } from '../features/mongo/constants';
import { EXPRESS } from '../features/express/constants';
import { SPOTIFY } from '../features/spotify/constants';

const env = dotenv.config().parsed;

const config = {
  env: env.NODE_ENV,
  features: {
    [EXPRESS]: {
      port: defaultTo(8080, env.PORT),
      prefix: '/api',
      baseURL: env.BASE_URL,
    },
    [SPOTIFY]: {
      redirectPath: '/api/spotify/auth/callback',
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
    },
    [MONGO]: {
      connectionString: env.MONGO_CONNECTION_STRING,
    },
  },
};

export default config;
