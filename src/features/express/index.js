import http from 'http';
import { getMetaResult } from 'oxium';
import express from 'express';
import { call, evolve, map, pipe } from 'ramda';
import { WEB } from '../../constants';
import { setEnv } from '../../accessors/feature';
import useMiddlewares from './util/useMiddlewares';
import useRoutes, { prepareRoutes } from './util/useRoutes';
import startServer from './util/startServer';
import wrapResolver from './util/wrapResolver';
import { getAllRoutes, getExpressConfig } from './accessors';

const getRoutes = root => {
  const routes = getAllRoutes(root);
  const { prefix } = getExpressConfig(root);
  const arg = getMetaResult(root);
  const evolveRoute = evolve({
    resolver: wrapResolver(arg),
  });

  return pipe(prepareRoutes(prefix), map(evolveRoute))(routes);
};

const Express = async root => {
  const { port } = getExpressConfig(root);
  const routes = getRoutes(root);

  const createApp = pipe(call, useMiddlewares([]), useRoutes(routes));

  const app = createApp(express);
  const server = http.createServer(app);

  await startServer(port, server);
};

export default pipe(setEnv(WEB))(Express);
