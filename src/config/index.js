import dotenv from 'dotenv';
import { MONGO } from '../features/mongo/constants';
import { EXPRESS } from '../features/express/constants';
import { SPOTIFY } from '../features/spotify/constants';

const env = dotenv.config().parsed;

const config = {
  env: env.NODE_ENV,
  github: {
    token: env.GITHUB_TOKEN,
  },
  vault: {
    baseURL: `${env.VAULT_ADDR}/v1`,
    path: env.VAULT_PATH,
    overrideConfig: {},
    defaultConfig: {
      [MONGO]: {
        connectionString: 'mongodb://mongo:27017/castus-local',
      },
    },
  },
  features: {
    [EXPRESS]: {
      port: env.PORT,
      prefix: '/api',
    },
    [SPOTIFY]: {
      redirectPath: '/api/spotify/auth/callback',
    },
  },
};

export default config;
