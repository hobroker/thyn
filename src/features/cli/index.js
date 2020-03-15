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
  omit,
  propOr,
} from 'ramda';
import { debugIt } from '../../util/debug';
import invariant from '../../util/invariant';
import { ARGV_EXEC, DEFAULT_ARGV, DEPENDENCIES } from './constants';

const getApp = curry((argv, apps) => {
  const key = argv[ARGV_EXEC];
  const execItem = apps[key];
  invariant(isFunction(execItem), `app ${key} not found`);

  debugIt('executing "%s" app', key);

  return execItem;
});

const getFeaturesToOmit = (features, argv) =>
  filter(compose(not, all(applyTo(argv)), propOr([], DEPENDENCIES)), features);

const getArgv = compose(mergeRight(DEFAULT_ARGV), omit(['_']), parse);

const Cli = async (oxi, features) => {
  const argv = getArgv(process.argv);
  debugIt('argv', argv);

  const featuresToOmit = getFeaturesToOmit(features, argv);

  features.forEach((feature, idx) => {
    if (featuresToOmit.includes(feature)) {
      features.splice(idx, 1);
    }
  });

  return {
    cli: getApp(argv),
  };
};

export default Cli;
