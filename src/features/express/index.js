import http from 'http';
import { getMetaResult } from 'oxium';
import express from 'express';
import { call, chain, evolve, map, pipe } from 'ramda';
import { WEB } from '../../constants';
import { setEnv } from '../../accessors/feature';
import useMiddlewares from './util/useMiddlewares';
import useRoutes from './util/useRoutes';
import startServer from './util/startServer';
import wrapResolver from './util/wrapResolver';
import { getAllRoutes, getExpressConfig } from './accessors';
import flattenRoutes from './util/flattenRoutes';

const getRoutes = oxi => {
  const routes = getAllRoutes(oxi);
  const { prefix } = getExpressConfig(oxi);
  const arg = getMetaResult(oxi);
  const evolveRoute = evolve({
    resolver: wrapResolver(arg),
  });

  return pipe(
    chain(item => flattenRoutes({ [prefix]: item })),
    map(evolveRoute),
  )(routes);
};

const Express = async oxi => {
  const { port } = getExpressConfig(oxi);
  const routes = getRoutes(oxi);

  const createApp = pipe(call, useMiddlewares([]), useRoutes(routes));

  const app = createApp(express);
  const server = http.createServer(app);

  await startServer(port, server);
};

export default pipe(setEnv(WEB))(Express);
