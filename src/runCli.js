import { propEq } from 'ramda';
import { CLI, ENV } from './constants';
import { getAllClis } from './lens/app';
import { parseArgv } from './util/cli';

const runCli = app => {
  const { cli } = parseArgv(process.argv);
  const clis = getAllClis(app);
  const x = clis[cli];

  if (!x) {
    throw new Error('wrong');
  }

  return x(app);
};

export const shouldRunCli = propEq(ENV, CLI);

export default runCli;
