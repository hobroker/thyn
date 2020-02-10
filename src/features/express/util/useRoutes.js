import { chain, compose, curry, evolve, map } from 'ramda';
import { appendFlipped } from 'ramda-adjunct';
import concatPaths from './concatPaths';
import wrapResolver from './wrapResolver';
import { createDebug } from '../../../util/debug';
import { EXPRESS } from '../constants';

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

const useRoutes = curry((config, routes, app) => {
  const { prefix } = config;
  const preparedRoutes = prepareRoutes(prefix)(routes);

  preparedRoutes.forEach(({ method, path, resolver }) => {
    app[method](path, wrapResolver(app, resolver));

    debugIt(`${method.toUpperCase()} ${path}`);
  });

  return app;
});

export default useRoutes;
