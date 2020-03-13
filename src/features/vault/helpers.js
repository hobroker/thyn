import { curry, path } from 'ramda';
import concatPaths from '../express/util/concatPaths';

export const makeSecretPath = curry((secretPath, { config }) =>
  concatPaths([path(['vault', 'path'], config), secretPath]),
);
