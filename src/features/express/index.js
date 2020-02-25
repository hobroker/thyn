import http from 'http';
import express from 'express';
import { call, pipe } from 'ramda';
import { WEB } from '../../constants';
import useMiddlewares from './util/useMiddlewares';
import useRoutes from './util/useRoutes';
import startServer from './util/startServer';
import { setEnv } from '../../accessors/feature';
import { getExpressConfig } from './accessors';

const Express = async root => {
  const config = getExpressConfig(root);
  const app = pipe(call, useMiddlewares, useRoutes(root))(express);
  const server = http.createServer(app);

  await startServer(config, server);
};

export default pipe(setEnv(WEB))(Express);
