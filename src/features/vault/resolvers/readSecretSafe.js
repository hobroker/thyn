import { always, identity, pipe, prop, tap, unless, useWith } from 'ramda';
import readSecret from './readSecret';
import { debugIt } from '../../../util/debug';
import throwIt from '../../../util/throwIt';

const getDefaultSecretValue = useWith(prop, [identity, prop('defaultConfig')]);

const findDefaultValue = (path, config) =>
  pipe(
    always(getDefaultSecretValue(path, config.vault)),
    unless(identity, throwIt(`Error: no default value for path "${path}"`)),
    tap(value => debugIt('Using default value', value)),
  );

const readSecretSafe = path => ({ config, vault }) =>
  readSecret(path, { config, vault }).catch(findDefaultValue(path, config));

export default readSecretSafe;
