import { compose, identity } from 'ramda';
import { debugIt } from '../../util/debug';
import { setHandler, setId, shareModels } from '../../lens/feature';
import { shareRoutes } from '../express/lens';
import { SECOND } from './constants';
import * as models from './models';
import * as routes from './routes';

const handler = app => {
  debugIt('SECOND start', typeof app);

  return identity;
};

const Second = compose(
  setId(SECOND),
  setHandler(handler),
  shareModels(models),
  shareRoutes(routes),
);

export default Second;
