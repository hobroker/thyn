import invariant from 'oxium/src/util/invariant';
import { curry } from 'ramda';
import { isFunction } from 'ramda-adjunct';
import { createDebug } from './debug';

const debugIt = createDebug('execApp');

const execApp = curry((items, root) => {
  debugIt('hello');
  const execArgv = 'default'; // TODO change this
  const execItem = items[execArgv];
  invariant(isFunction(execItem), `execItem ${execArgv} not found`);

  debugIt('executing %s app', execArgv);

  return execItem(root);
});

export default execApp;
