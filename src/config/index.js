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
    spotify: {
      api: {
        clientId: env.SPOTIFY_CLIENT_ID,
        clientSecret: env.SPOTIFY_CLIENT_SECRET,
      },
      auth: {
        redirectPath: '/api/spotify/auth/callback',
      },
    },
  },
};

export default config;
