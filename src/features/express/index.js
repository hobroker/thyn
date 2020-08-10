import express from 'express';
import { compose } from 'ramda';
import { ensureIsWebApp } from '../cli/accessors';
import useMiddlewares from './util/useMiddlewares';
import useRoutes from './util/useRoutes';
import getRoutes from './helpers/getRoutes';

const Express = (oxi, features) => {
  const routes = oxi(getRoutes(features));

  const createApp = compose(useRoutes(routes), useMiddlewares([]), express);

  const app = createApp();

  return {
    express: app,
  };
};

export default ensureIsWebApp(Express);
