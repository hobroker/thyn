import { pipe } from 'ramda';
import { setHandler, setId } from 'oxium';
import { CLI } from '../../constants';
import { createDebug } from '../../util/debug';
import { setMetaEnv } from '../../lens/feature';
import { SECOND } from './constants';

const debugIt = createDebug(SECOND);

const handler = root => {
  debugIt('SECOND start', typeof root);
};

const Second = pipe(setId(SECOND), setMetaEnv(CLI), setHandler(handler));

export default Second;
