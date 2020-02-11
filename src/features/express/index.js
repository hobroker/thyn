import http from 'http';
import { setHandler, setId } from 'oxium';
import express from 'express';
import { call, pipe } from 'ramda';
import { setHandlerResult } from '../../lens/feature';
import { EXPRESS } from './constants';
import { getAllRoutes, getExpressConfig } from './lens';
import useMiddlewares from './util/useMiddlewares';
import useRoutes from './util/useRoutes';
import startServer from './util/startServer';

const handler = async app => {
  const config = getExpressConfig(app);
  const routes = getAllRoutes(app);
  const api = pipe(call, useMiddlewares, useRoutes(config, routes))(express);
  const server = http.createServer(api);

  await startServer(config, server);

  return setHandlerResult(api);
};

const Express = pipe(setId(EXPRESS), setHandler(handler));

export default Express;
