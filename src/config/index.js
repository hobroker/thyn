import dotenv from 'dotenv';
import { debugIt } from '../util/debug';

const env = dotenv.config().parsed;

debugIt('env', env);

const config = {
  env: env.NODE_ENV,
  github: {
    token: env.GITHUB_TOKEN,
  },
  vault: {
    baseURL: `${env.VAULT_ADDR}/v1`,
    path: env.VAULT_PATH,
    defaultConfig: {
      mongo: {
        connectionString: 'mongodb://mongo:27017/castus-local',
      },
    },
  },
  features: {
    mongo: {
      connectionString: 'mongodb://mongo:27017/castus-local',
    },
    express: {
      port: env.PORT,
      prefix: '/api',
    },
    spotify: {
      redirectPath: '/api/spotify/auth/callback',
    },
  },
};

export default config;
