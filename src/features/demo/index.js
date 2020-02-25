import { pipe } from 'ramda';
import { WEB } from '../../constants';
import { createDebug } from '../../util/debug';
import { DEMO } from './constants';
import * as models from './models';
import * as routes from './routes';
import { setEnv, setModels } from '../../accessors/feature';
import { setRoutes } from '../express/accessors';

const debugIt = createDebug(DEMO);

const Demo = async () => {
  debugIt('Demo start');
  // const wMongo = getDefaultMongoWeave(root);
  // debugIt('DEMO start', await wMongo(getAllDemoDocs()));
};

export default pipe(setEnv(WEB), setModels(models), setRoutes(routes))(Demo);
