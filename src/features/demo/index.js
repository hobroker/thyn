import { pipe } from 'ramda';
import { setEnv } from '../../accessors/feature';
import { debugIt } from '../../util/debug';
import { addRoutes } from '../express/accessors';
import { WEB } from '../cli/constants';
import { setModels } from '../mongo/accessors';
import * as models from './models';
import routes from './routes';

const Demo = async () => {
  debugIt('Demo start');

  return {};
};

export default pipe(setEnv(WEB), setModels(models), addRoutes(routes))(Demo);
