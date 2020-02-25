import { chain, compose, curry, evolve, map } from 'ramda';
import { appendFlipped } from 'ramda-adjunct';
import { createDebug } from '../../../util/debug';
import concatPaths from './concatPaths';
import { EXPRESS } from '../constants';

const debugIt = createDebug(`${EXPRESS}:useRoutes`);

const addPrefixes = (globalPrefix, prefix) =>
  evolve({
    path: compose(concatPaths, appendFlipped([globalPrefix, prefix])),
  });

export const prepareRoutes = globalPrefix =>
  chain(({ prefix, routes }) => map(addPrefixes(globalPrefix, prefix), routes));

const useRoutes = curry((routes, app) => {
  routes.forEach(({ method, path, resolver }) => {
    app[method](path, resolver);

    debugIt(`${method} ${path}`.toUpperCase());
  });

  return app;
});

export default useRoutes;
