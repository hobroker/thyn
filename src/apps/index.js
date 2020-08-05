import { identity } from 'ramda';
import spotify from './spotify';
import daemon from './daemon';
import gqlSchema from './gqlSchema';

export default {
  web: identity,
  spotify,
  daemon,
  gqlSchema,
};
