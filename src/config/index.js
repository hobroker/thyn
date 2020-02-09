import dotenv from 'dotenv';

const env = dotenv.config().parsed;

const config = {
  env: env.NODE_ENV,
  features: {
    mongo: {
      connectionString: env.MONGO_CONNECTION_STRING,
    },
    express: {
      port: env.PORT,
      prefix: '/api',
    },
  },
};

export default config;
