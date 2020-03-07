import { curry, tap } from 'ramda';
import authGithub from './authGithub';

const updateToken = curry((_, { vault, config }) =>
  authGithub(null, { vault, config }).then(
    tap(token => {
      // eslint-disable-next-line no-param-reassign
      vault.defaults.headers['X-Vault-Token'] = token;
    }),
  ),
);

export default updateToken;
