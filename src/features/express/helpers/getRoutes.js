import { chain, curry, evolve, map, objOf, pipe } from 'ramda';
import flattenRoutes from '../util/flattenRoutes';
import wrapResolver from '../util/wrapResolver';
import { getAllRoutes, getExpressConfig } from '../accessors';

const prepareRoutes = (arg, prefix) =>
  pipe(
    objOf(prefix),
    flattenRoutes,
    map(
      evolve({
        resolver: wrapResolver(arg),
      }),
    ),
  );

const getRoutes = curry((features, oxi) => {
  const routes = getAllRoutes(features);
  const { prefix } = getExpressConfig(oxi);

  return chain(prepareRoutes(oxi, prefix), routes);
});

export default getRoutes;
