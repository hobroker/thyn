import bodyParser from 'body-parser';
import morgan from 'morgan';
import { apply, map, pipe } from 'ramda';
import { debugIt } from '..';

const morganMiddleware = morgan((tokens, req, res) =>
  pipe(
    map(key => tokens[key](req, res)),
    apply(debugIt),
  )(['method', 'url', 'status']),
);

const defaultMiddlewares = [bodyParser.json(), morganMiddleware];

const useMiddlewares = app => {
  defaultMiddlewares.forEach(middleware => app.use(middleware));

  return app;
};

export default useMiddlewares;
