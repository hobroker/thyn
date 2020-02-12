import parse from 'yargs-parser';
import { defaultTo, pipe, prop, useWith } from 'ramda';
import { CLI, WEB } from '../constants';
import { getEnv } from '../lens/feature';
import { getAllClis } from '../lens/app';

export const parseArgv = parse;

export const parseEnv = pipe(parseArgv, getEnv, defaultTo(WEB));

export const findCli = useWith(prop, [prop(CLI), getAllClis]);
