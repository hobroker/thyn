import http from 'http';
import express from 'express';
import { call, chain, curry, evolve, map, objOf, pipe } from 'ramda';
import { WEB } from '../../constants';
import { setEnv } from '../../accessors/feature';
import useMiddlewares from './util/useMiddlewares';
import useRoutes from './util/useRoutes';
import startServer from './util/startServer';
import wrapResolver from './util/wrapResolver';
import { getAllRoutes, getExpressConfig } from './accessors';
import flattenRoutes from './util/flattenRoutes';

const prepareRoutes = (arg, prefix) =>
  pipe(
    objOf(prefix),
    flattenRoutes,
    map(
      evolve({
        resolver: wrapResolver(arg),
      }),
    ),
  );

const getRoutes = curry((features, oxi) => {
  const routes = getAllRoutes(features);
  const { prefix } = getExpressConfig(oxi);

  return chain(prepareRoutes(oxi, prefix), routes);
});

const Express = async (oxi, features) => {
  const { port } = getExpressConfig(oxi);
  const routes = oxi(getRoutes(features));

  const createApp = pipe(call, useMiddlewares([]), useRoutes(routes));

  const app = createApp(express);
  const server = http.createServer(app);

  await startServer(port, server);

  return {};
};

export default pipe(setEnv(WEB))(Express);
