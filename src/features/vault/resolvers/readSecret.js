import { getSecretContents } from '../accessors';
import { debugIt } from '../../../util/debug';
import tapThrow from '../../../util/tapThrow';

export const onError = path =>
  tapThrow(error => {
    debugIt(`Error for secret "${path}"`);
    debugIt(
      'Response:',
      error.request.path,
      error.message,
      error.response.data,
    );
  });

const readSecret = path => ({ vault }) =>
  vault
    .get(path)
    .then(getSecretContents)
    .catch(onError(path));

export default readSecret;
