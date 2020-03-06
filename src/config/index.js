import dotenv from 'dotenv';

const env = dotenv.config().parsed;

const config = {
  env: env.NODE_ENV,
  vault: {
    baseURL: env.VAULT_ADDR,
    token: env.VAULT_TOKEN,
  },
  features: {
    mongo: {
      connectionString: env.MONGO_CONNECTION_STRING,
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
