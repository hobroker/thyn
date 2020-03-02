import { pipe } from 'ramda';
import { setEnv, setModels } from '../../accessors/feature';
import { WEB } from '../../constants';
import { debugIt } from '../../util/debug';
import { addRoutes } from '../express/accessors';
import * as models from './models';
import routes from './routes';

const Demo = async () => {
  debugIt('Demo start');

  return {};
};

export default pipe(setEnv(WEB), setModels(models), addRoutes(routes))(Demo);
