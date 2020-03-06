import { getSecretContents } from '../accessors';
import { debugIt } from '../../../util/debug';

export const onError = path => error => {
  debugIt(`Error for secret "${path}"`);
  debugIt('Response:', error.request.path, error.message, error.response.data);

  throw error;
};

const readSecret = path => ({ vault }) =>
  vault
    .get(path)
    .then(getSecretContents)
    .catch(onError(path));

export default readSecret;
