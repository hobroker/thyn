import dotenv from 'dotenv';

const env = dotenv.config().parsed;

const config = {
  env: env.NODE_ENV,
  appName: env.NAME,
  features: {
    mongo: {
      connectionString: env.MONGO_CONNECTION_STRING,
    },
  },
};

export default config;
