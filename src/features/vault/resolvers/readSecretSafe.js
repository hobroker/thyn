import { identity, prop, useWith } from 'ramda';
import { getSecretContents } from '../accessors';

const getDefaultSecretValue = useWith(prop, [identity, prop('defaultConfig')]);

const readSecretSafe = path => ({ config, vault }) =>
  vault
    .get(path)
    .then(getSecretContents)
    .catch(() => getDefaultSecretValue(path, config.vault));

export default readSecretSafe;
