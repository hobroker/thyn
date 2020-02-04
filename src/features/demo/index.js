import { deferHandler } from 'oxium';
import { compose } from 'ramda';
import { isMongoLoaded, shareMongoModels } from '../mongo/lens';
import * as models from './models';
import { debugIt } from '../../util/debug';

export const DEMO = 'demo';

const handler = async () => {
  debugIt('DEMO start');
};

const Demo = compose(
  deferHandler(isMongoLoaded),
  shareMongoModels(models),
)({
  id: DEMO,
  handler,
});

export default Demo;
