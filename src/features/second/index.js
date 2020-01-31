import { identity } from 'ramda';
import { shareMongoModels } from '../mongo/lens';
import * as models from './models';
import { debugIt } from '../../util/debug';

const SECOND = 'second';

const handler = app => {
  debugIt('SECOND start', typeof app);

  return identity;
};

const Second = shareMongoModels(models)({
  id: SECOND,
  handler,
});

export { SECOND };
export default Second;
