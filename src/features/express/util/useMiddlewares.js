import bodyParser from 'body-parser';
import { apply, map, pipe } from 'ramda';
import { createDebug } from '../../../util/debug';
import { EXPRESS } from '../constants';

// issue: https://github.com/expressjs/morgan/issues/190
const morgan = require('morgan');

const debugIt = createDebug(EXPRESS);

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
