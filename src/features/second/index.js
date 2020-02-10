import { compose, identity } from 'ramda';
import { setHandler, setId } from 'oxium/src/lens/feature';
import { createDebug } from '../../util/debug';
import { shareModels } from '../../lens/feature';
import { shareRoutes } from '../express/lens';
import { SECOND } from './constants';
import * as models from './models';
import * as routes from './routes';

const debugIt = createDebug(SECOND);

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
