import parse from 'yargs-parser';
import { omit, pipe } from 'ramda';

export const parseArgv = pipe(parse, omit('_'));
