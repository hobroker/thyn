import http from 'http';
import express from 'express';
import { compose } from 'ramda';
import { debugIt } from '../../util/debug';
import { whenDying } from '../death/helpers';
import { ensureIsWebApp } from '../cli/accessors';
import useMiddlewares from './util/useMiddlewares';
import useRoutes from './util/useRoutes';
import startServer from './util/startServer';
import getRoutes from './helpers/getRoutes';
import { getExpressConfig } from './accessors';
import userMiddleware from '../user/addUserMiddleware';

const Express = async (oxi, features) => {
  const { baseURL, port } = getExpressConfig(oxi);
  const routes = oxi(getRoutes(features));

  const createApp = compose(
    useRoutes(routes),
    useMiddlewares([userMiddleware(oxi)]),
    express,
  );

  const app = createApp();

  if (oxi.config.env !== 'TEST') {
    const server = http.createServer(app);
    await startServer(port, server);
    debugIt('baseURL', baseURL);

    oxi(
      whenDying(() => {
        debugIt('stopping');

        return new Promise(server.close.bind(server));
      }),
    );
  }

  return {
    express: app,
  };
};

export default ensureIsWebApp(Express);
