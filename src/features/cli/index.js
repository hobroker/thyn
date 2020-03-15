import parse from 'yargs-parser';
import { isFunction } from 'ramda-adjunct';
import {
  all,
  applyTo,
  compose,
  curry,
  filter,
  mergeRight,
  not,
  propOr,
} from 'ramda';
import { debugIt } from '../../util/debug';
import invariant from '../../util/invariant';
import { DEFAULT_ARGV, ARGV_EXEC, WEB, DEPENDENCIES } from './constants';

const getApp = curry((key, apps) => {
  const execItem = apps[key];
  invariant(isFunction(execItem), `app ${key} not found`);

  debugIt('executing "%s" app', key);

  return execItem;
});

const getFeaturesToOmit = (features, argv) =>
  filter(compose(not, all(applyTo(argv)), propOr([], DEPENDENCIES)), features);

const getArgv = compose(mergeRight(DEFAULT_ARGV), parse);

const Cli = async (oxi, features) => {
  const argv = getArgv(process.argv);
  debugIt('argv', argv);
  const appName = propOr(WEB, ARGV_EXEC, argv);

  const featuresToOmit = getFeaturesToOmit(features, argv);

  features.forEach((feature, idx) => {
    if (featuresToOmit.includes(feature)) {
      features.splice(idx, 1);
    }
  });

  return {
    cli: getApp(appName),
  };
};

export default Cli;
