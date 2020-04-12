import http from 'http';
import express from 'express';
import { call, pipe } from 'ramda';
import { debugIt } from '../../util/debug';
import { whenDying } from '../death/helpers';
import { ensureDependencies, isWebApp } from '../cli/accessors';
import readSecretSafe from '../vault/resolvers/readSecretSafe';
import useMiddlewares from './util/useMiddlewares';
import useRoutes from './util/useRoutes';
import startServer from './util/startServer';
import getRoutes from './helpers/getRoutes';
import { getExpressConfig } from './accessors';
import { EXPRESS } from './constants';

const Express = async (oxi, features) => {
  const { port } = getExpressConfig(oxi);
  const { baseURL } = await oxi(readSecretSafe(EXPRESS));
  const routes = oxi(getRoutes(features));

  const createApp = pipe(call, useMiddlewares([]), useRoutes(routes));

  const app = createApp(express);
  const server = http.createServer(app);

  await startServer(port, server);
  debugIt('baseURL', baseURL);

  oxi(
    whenDying(() => {
      debugIt('stopping');

      return new Promise(server.close.bind(server));
    }),
  );

  return {
    express: {
      baseURL,
    },
  };
};

export default pipe(ensureDependencies([isWebApp]))(Express);
