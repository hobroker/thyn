import { pipe } from 'ramda';
import { setHandler, setId } from 'oxium';
import { CLI } from '../../constants';
import { createDebug } from '../../util/debug';
import { setCli, setMetaEnv } from '../../lens/feature';
import { SECOND } from './constants';
import * as cli from './cli';

const debugIt = createDebug(SECOND);

const handler = app => {
  debugIt('SECOND start', typeof app);
};

const Second = pipe(
  setId(SECOND),
  setMetaEnv(CLI),
  setCli(cli),
  setHandler(handler),
);

export default Second;
