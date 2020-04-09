import { addRoutes } from '../express/accessors';
import routes from './routes';

const Summary = () => ({
  summary: new Map(),
});

export default addRoutes(routes)(Summary);
