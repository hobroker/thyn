import parse from 'yargs-parser';
import { defaultTo, pipe } from 'ramda';
import { WEB } from '../constants';
import { getEnv } from '../lens/feature';

const parseEnv = pipe(parse, getEnv, defaultTo(WEB));

export default parseEnv;
