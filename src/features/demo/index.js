import { deferHandler } from 'oxium';
import { compose } from 'ramda';
import { setHandler, setId, shareModels } from '../../lens/feature';
import { createDebug } from '../../util/debug';
import { getDefaultMongoWeave, isMongoLoaded } from '../mongo/lens';
import { getAllDemoDocs } from './mongo-actions';
import { setRoutes } from '../express/lens';
import { DEMO } from './constants';
import * as models from './models';
import routes from './routes';

const debugIt = createDebug(DEMO);

const handler = async app => {
  const wMongo = getDefaultMongoWeave(app);
  debugIt('DEMO start', await wMongo(getAllDemoDocs()));
};

const Demo = compose(
  setId(DEMO),
  deferHandler(isMongoLoaded),
  setHandler(handler),
  shareModels(models),
  setRoutes(routes),
);

export default Demo;
