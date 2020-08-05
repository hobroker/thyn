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
import { DEFAULT_ARGV, DEPENDENCIES } from './constants';
import { getArgvExec } from './accessors';

const getApp = curry((argv, apps) => {
  const key = getArgvExec(argv);
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

  for (let idx = 0; idx < features.length; ) {
    const feature = features[idx];
    if (featuresToOmit.includes(feature)) {
      features.splice(idx, 1);
    } else {
      idx += 1;
    }
  }

  const name = getArgvExec(argv);

  return {
    cli: {
      getApp: getApp(argv),
      name,
    },
  };
};

export default Cli;
