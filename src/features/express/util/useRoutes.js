import { chain, compose, curry, evolve, map } from 'ramda';
import { appendFlipped } from 'ramda-adjunct';
import concatPaths from './concatPaths';
import { debugIt } from '..';

const prepareRoutes = globalPrefix =>
  compose(
    chain(({ prefix, routes }) =>
      map(
        evolve({
          path: compose(concatPaths, appendFlipped([globalPrefix, prefix])),
        }),
        routes,
      ),
    ),
  );

const useRoutes = curry((config, routes, app) => {
  const { prefix } = config;
  const preparedRoutes = prepareRoutes(prefix)(routes);
  debugIt('preparedRoutes', preparedRoutes);

  // eslint-disable-next-line no-unused-vars
  preparedRoutes.forEach(({ method, path, resolvers }) => {
    // app[method](path, ...resolvers);
  });

  return app;
});

export default useRoutes;
