import parse from 'yargs-parser';
import { isFunction } from 'ramda-adjunct';
import { propOr } from 'ramda';
import { debugIt } from '../../util/debug';
import invariant from '../../util/invariant';
import { EXEC, WEB } from './constants';
import { isRightApp } from './accessors';

const getApp = key => apps => {
  const execItem = apps[key];
  invariant(isFunction(execItem), `app ${key} not found`);

  debugIt('executing "%s" app', key);

  return execItem;
};

const Cli = async (_, features) => {
  const argv = parse(process.argv);
  const appName = propOr(WEB, EXEC, argv);

  features.forEach(({ env }, idx) => {
    if (!isRightApp(appName, env)) {
      features.splice(idx, 1);
    }
  });

  return {
    cli: getApp(appName),
  };
};

export default Cli;
