import { compose } from 'ramda';
import { deferHandler } from 'oxium';
import {
  getDefaultMongoWeave,
  isMongoLoaded,
  shareMongoModels,
} from '../mongo/lens';
import * as models from './models';
import { getAllDemoDocs } from './mongo-actions';
import { debugIt } from '../../util/debug';

export const DEMO = 'demo';

const handler = async app => {
  const wMongo = getDefaultMongoWeave(app);
  debugIt('DEMO start', await wMongo(getAllDemoDocs()));
};

const Demo = compose(
  deferHandler(isMongoLoaded),
  shareMongoModels(models),
)({
  id: DEMO,
  handler,
});

export default Demo;
