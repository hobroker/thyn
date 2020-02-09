import bodyParser from 'body-parser';
import morgan from 'morgan';
import { apply, map, pipe } from 'ramda';
import { createDebug } from '../../../util/debug';
import { EXPRESS } from '../constants';

const debugIt = createDebug(EXPRESS);

const createMorganMiddleware = () =>
  morgan((tokens, req, res) =>
    pipe(
      map(key => tokens[key](req, res)),
      apply(debugIt),
    )(['method', 'url', 'status']),
  );

const defaultMiddlewares = [bodyParser.json()];

const useMiddlewares = app => {
  const middlewares = [...defaultMiddlewares, createMorganMiddleware(app)];

  middlewares.forEach(middleware => app.use(middleware));

  return app;
};

export default useMiddlewares;
