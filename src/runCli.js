import { propEq } from 'ramda';
import { isFunction } from 'ramda-adjunct';
import invariant from 'oxium/src/util/invariant';
import { CLI, ENV } from './constants';
import { findCli, parseArgv } from './util/cli';

const runCli = app => {
  const cli = findCli(parseArgv(process.argv), app);
  invariant(isFunction(cli), 'cli not found');

  if (!cli) {
    throw new Error('wrong');
  }

  return cli(app);
};

export const shouldRunCli = propEq(ENV, CLI);

export default runCli;
