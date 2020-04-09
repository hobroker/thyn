import { addRoutes } from '../express/accessors';
import routes from './routes';

const Summary = () => {
  const summary = {
    fns: {},
    set(key, value) {
      summary.fns[key] = value;
    },
  };

  return {
    summary,
  };
};

export default addRoutes(routes)(Summary);
