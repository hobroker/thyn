import dotenv from 'dotenv';

const env = dotenv.config().parsed;

const config = {
  env: env.NODE_ENV,
  vault: {
    baseURL: `${env.VAULT_ADDR}/v1`,
    path: env.VAULT_PATH,
    token: env.VAULT_TOKEN,
    defaultConfig: {
      mongo: {
        connectionString: 'mongodb://localhost:27017/castus-local',
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
