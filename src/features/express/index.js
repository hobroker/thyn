import http from 'http';
import express from 'express';
import { call, compose, pipe } from 'ramda';
import {
  setHandler,
  setHandlerResult,
  setId,
  shareModels,
} from '../../lens/feature';
import useMiddlewares from './util/useMiddlewares';
import useRoutes from './util/useRoutes';
import startServer from './util/startServer';
import { EXPRESS } from './constants';
import { getAllRoutes, getExpressConfig } from './lens';
import * as models from './models';

const handler = async app => {
  const config = getExpressConfig(app);
  const routes = getAllRoutes(app);
  const api = pipe(call, useMiddlewares, useRoutes(config, routes))(express);
  const server = http.createServer(api);

  await startServer(config, server);

  return setHandlerResult(api);
};

const Express = compose(
  setId(EXPRESS),
  setHandler(handler),
  shareModels(models),
);

export default Express;
