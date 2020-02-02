import { deferHandler } from 'oxium';
import { compose } from 'ramda';
import { debugIt } from '../../util/debug';
import {
  getDefaultMongoWeave,
  isMongoLoaded,
  shareMongoModels,
} from '../mongo/lens';
import { getAllDemoDocs } from './mongo-actions';
import * as models from './models';

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
