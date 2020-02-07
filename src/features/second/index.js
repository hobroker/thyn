import { compose, identity } from 'ramda';
import { debugIt } from '../../util/debug';
import * as models from './models';
import { setHandler, setId, shareModels } from '../../lens/feature';
import { SECOND } from './constants';

const handler = app => {
  debugIt('SECOND start', typeof app);

  return identity;
};

const Second = compose(setId(SECOND), setHandler(handler), shareModels(models));

export default Second;
