import parse from 'yargs-parser';
import { defaultTo, pipe, prop } from 'ramda';
import { ENV, WEB } from '../constants';

const parseEnv = pipe(parse, prop(ENV), defaultTo(WEB));

export default parseEnv;
