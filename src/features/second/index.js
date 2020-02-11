import { pipe } from 'ramda';
import { setHandler, setId } from 'oxium';
import { CLI } from '../../constants';
import { createDebug } from '../../util/debug';
import { setMetaEnv, shareModels } from '../../lens/feature';
import { SECOND } from './constants';
import * as models from './models';

const debugIt = createDebug(SECOND);

const handler = app => {
  debugIt('SECOND start', typeof app);
};

const Second = pipe(
  setId(SECOND),
  setMetaEnv(CLI),
  setHandler(handler),
  shareModels(models),
);

export default Second;
