import { compose, identity } from 'ramda';
import { createDebug } from '../../util/debug';
import { setHandler, setId } from '../../lens/feature';
import { EXPRESS } from './constants';
import { getExpressConfig, getAllRoutes } from './lens';
import applyMiddlewares from './util/applyMiddlewares';
import createExpressApp from './util/createExpressApp';

const debugIt = createDebug(EXPRESS);

const handler = app => {
  const config = getExpressConfig(app);
  const routes = getAllRoutes(app);
  debugIt(routes);
  // eslint-disable-next-line no-unused-vars
  const express = createExpressApp(config, [applyMiddlewares]);

  return identity;
};

const Express = compose(setId(EXPRESS), setHandler(handler));

export default Express;
