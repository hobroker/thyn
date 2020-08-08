import { compose } from 'ramda';
import { debugIt } from '../../util/debug';
import { addRoutes } from '../express/accessors';
import { setModels } from '../mongo/accessors';
import * as models from './models';
import routes from './routes';

const User = () => {
  debugIt('User start');
};

export default compose(setModels(models), addRoutes(routes))(User);
