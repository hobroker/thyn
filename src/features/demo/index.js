import { deferHandler, setHandler, setId } from 'oxium';
import { pipe } from 'ramda';
import { WEB } from '../../constants';
import { setMetaEnv, shareModels } from '../../lens/feature';
import { createDebug } from '../../util/debug';
import { getDefaultMongoWeave, isMongoLoaded } from '../mongo/lens';
import { getAllDemoDocs } from './mongo-actions';
import { shareRoutes } from '../express/lens';
import { DEMO } from './constants';
import * as models from './models';
import * as routes from './routes';

const debugIt = createDebug(DEMO);

const handler = async root => {
  const wMongo = getDefaultMongoWeave(root);
  debugIt('DEMO start', await wMongo(getAllDemoDocs()));
};

const Demo = pipe(
  setId(DEMO),
  setMetaEnv(WEB),
  setHandler(handler),
  deferHandler(isMongoLoaded),
  shareModels(models),
  shareRoutes(routes),
);

export default Demo;
