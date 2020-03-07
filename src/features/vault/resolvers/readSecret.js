import { curry } from 'ramda';
import { debugIt } from '../../../util/debug';
import tapThrow from '../../../util/tapThrow';
import { getSecretContents } from '../accessors';
import { getSecretPath } from '../helpers';

export const onError = path =>
  tapThrow(error => {
    debugIt(`Error for secret "${path}"`);
    debugIt('Response:', error.request.path, error.message);
  });

const readSecret = curry((path, { vault, config }) =>
  vault
    .get(getSecretPath(path, { config }))
    .then(getSecretContents)
    .catch(onError(path)),
);

export default readSecret;
