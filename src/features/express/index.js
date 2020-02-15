import http from 'http';
import { setHandler, setId } from 'oxium';
import express from 'express';
import { call, pipe } from 'ramda';
import { WEB } from '../../constants';
import { setHandlerResult, setMetaEnv } from '../../lens/feature';
import useMiddlewares from './util/useMiddlewares';
import useRoutes from './util/useRoutes';
import startServer from './util/startServer';
import { EXPRESS } from './constants';
import { getAllRoutes, getExpressConfig } from './lens';

const handler = async root => {
  const config = getExpressConfig(root);
  const routes = getAllRoutes(root);
  const app = pipe(call, useMiddlewares, useRoutes(config, routes))(express);
  const server = http.createServer(app);

  await startServer(config, server);

  return setHandlerResult(app);
};

const Express = pipe(setId(EXPRESS), setMetaEnv(WEB), setHandler(handler));

export default Express;
