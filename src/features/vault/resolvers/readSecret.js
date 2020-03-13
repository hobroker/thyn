import { curry } from 'ramda';
import { debugIt } from '../../../util/debug';
import tapThrow from '../../../util/tapThrow';
import { getSecretContents } from '../accessors';
import { makeSecretPath } from '../helpers';

export const onError = path =>
  tapThrow(({ request, message, response }) => {
    debugIt(`Error for secret "${path}"`);
    debugIt('Response:', request.path, message, response.data);
  });

const readSecret = curry((path, { vault, config }) =>
  vault
    .get(makeSecretPath(path, { config }))
    .then(getSecretContents)
    .catch(onError(path)),
);

export default readSecret;
