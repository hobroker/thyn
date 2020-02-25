import { chain, compose, curry, evolve, map } from 'ramda';
import { appendFlipped } from 'ramda-adjunct';
import { createDebug } from '../../../util/debug';
import concatPaths from './concatPaths';
import wrapResolver from './wrapResolver';
import { EXPRESS } from '../constants';
import { getAllRoutes, getExpressConfig } from '../accessors';

const debugIt = createDebug(`${EXPRESS}:morgan`);

const prepareRoutes = globalPrefix =>
  chain(({ prefix, routes }) =>
    map(
      evolve({
        path: compose(concatPaths, appendFlipped([globalPrefix, prefix])),
      }),
      routes,
    ),
  );

const useRoutes = curry((root, app) => {
  const { prefix } = getExpressConfig(root);
  const routes = getAllRoutes(root);
  const preparedRoutes = prepareRoutes(prefix)(routes);

  preparedRoutes.forEach(({ method, path, resolver }) => {
    app[method](path, wrapResolver(root, resolver));

    debugIt(`${method.toUpperCase()} ${path}`);
  });

  return app;
});

export default useRoutes;
