import path from 'path';
import dotenv from 'dotenv';
import { defaultTo } from 'ramda';
import { MONGO } from '../features/mongo/constants';
import { EXPRESS } from '../features/express/constants';
import { SPOTIFY } from '../features/spotify/constants';
import { APOLLO } from '../features/apollo/constants';

const env = dotenv.config().parsed;

const config = {
  env: env.NODE_ENV,
  app: {
    rootPath: path.resolve(__dirname, '../..'),
  },
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
    [APOLLO]: {
      schemaFilename: 'schema.graphql',
    },
  },
};

export default config;
