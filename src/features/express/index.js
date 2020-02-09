import http from 'http';
import express from 'express';
import { call, compose, pipe } from 'ramda';
import { createDebug } from '../../util/debug';
import { setHandler, setHandlerResult, setId } from '../../lens/feature';
import { EXPRESS } from './constants';
import { getAllRoutes, getExpressConfig } from './lens';
import useMiddlewares from './util/useMiddlewares';
import useRoutes from './util/useRoutes';
import startServer from './util/startServer';

export const debugIt = createDebug(EXPRESS);

const handler = async app => {
  const config = getExpressConfig(app);
  const routes = getAllRoutes(app);
  const api = pipe(call, useMiddlewares, useRoutes(config, routes))(express);
  const server = http.createServer(api);

  await startServer(config, server);

  return setHandlerResult(api);
};

const Express = compose(setId(EXPRESS), setHandler(handler));

export default Express;
