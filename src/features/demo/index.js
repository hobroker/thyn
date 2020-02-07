import { deferHandler } from 'oxium';
import { compose } from 'ramda';
import { getDefaultMongoWeave, isMongoLoaded } from '../mongo/lens';
import * as models from './models';
import { debugIt } from '../../util/debug';
import { DEMO } from './constants';
import { getAllDemoDocs } from './mongo-actions';
import { setHandler, setId, shareModels } from '../../lens/feature';

const handler = async app => {
  const wMongo = getDefaultMongoWeave(app);
  debugIt('DEMO start', await wMongo(getAllDemoDocs()));
};

const Demo = compose(
  deferHandler(isMongoLoaded),
  shareModels(models),
  setId(DEMO),
  setHandler(handler),
);

export default Demo;
