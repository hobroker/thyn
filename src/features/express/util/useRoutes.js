import { curry } from 'ramda';
import { debugIt } from '../../../util/debug';

const useRoutes = curry((routes, app) => {
  routes.forEach(({ method, path, resolver }) => {
    app[method](path, resolver);

    debugIt(`${method.toUpperCase()} ${path}`);
  });

  return app;
});

export default useRoutes;
