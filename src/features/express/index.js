import express from 'express';
import { call, compose, pipe } from 'ramda';
import { createDebug } from '../../util/debug';
import { setHandler, setHandlerResult, setId } from '../../lens/feature';
import { EXPRESS } from './constants';
import { getAllRoutes, getExpressConfig } from './lens';
import useMiddlewares from './util/useMiddlewares';
import useRoutes from './util/useRoutes';

export const debugIt = createDebug(EXPRESS);

const handler = app => {
  const config = getExpressConfig(app);
  const routes = getAllRoutes(app);
  const api = pipe(call, useMiddlewares, useRoutes(config, routes))(express);

  // console.log(api);

  return setHandlerResult(api);
};

const Express = compose(setId(EXPRESS), setHandler(handler));

export default Express;
