import { compose } from 'ramda';
import { addMiddlewares, addRoutes } from '../express/accessors';
import { setModels } from '../mongo/accessors';
import * as models from './models';
import routes from './routes';
import { addSchema } from '../apollo/accessors';
import schema from './schema';
import userMiddleware from './addUserMiddleware';

const User = () => {};

export default compose(
  addSchema(schema),
  setModels(models),
  addRoutes(routes),
  addMiddlewares([userMiddleware]),
)(User);
