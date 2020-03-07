import { curry, path } from 'ramda';

const authGithub = curry((_, { vault, config }) =>
  vault
    .post('/auth/github/login', {
      token: path(['github', 'token'], config),
    })
    .then(path(['data', 'auth', 'client_token'])),
);

export default authGithub;
