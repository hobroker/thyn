import {
  always,
  applyTo,
  compose,
  curry,
  identity,
  path,
  pipe,
  prop,
  tap,
  unless,
  useWith,
} from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';
import readSecret from './readSecret';
import { debugIt } from '../../../util/debug';
import throwIt from '../../../util/throwIt';

const getDefaultSecretValue = useWith(prop, [
  identity,
  path(['vault', 'defaultConfig']),
]);
const getOverrideSecretValue = compose(
  applyTo(undefined),
  useWith(prop, [identity, path(['vault', 'overrideConfig'])]),
);

const findDefaultValue = (configPath, config) =>
  pipe(
    always(getDefaultSecretValue(configPath, config)),
    unless(
      identity,
      throwIt(`Error: no default value for path "${configPath}"`),
    ),
    tap(value => debugIt('Using default value', value)),
  );

const readSecretSafe = curry((configPath, { config, vault }) => {
  const overridenData = getOverrideSecretValue(configPath, config);

  if (isNotUndefined(overridenData)) {
    return overridenData;
  }

  return readSecret(configPath, { config, vault }).catch(
    findDefaultValue(configPath, config),
  );
});

export default readSecretSafe;
