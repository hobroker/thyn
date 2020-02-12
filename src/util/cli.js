import parse from 'yargs-parser';
import { defaultTo, pipe } from 'ramda';
import { WEB } from '../constants';
import { getEnv } from '../lens/feature';

export const parseArgv = parse;

export const parseEnv = pipe(parseArgv, getEnv, defaultTo(WEB));
