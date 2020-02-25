import { CLI } from '../../constants';
import { setEnv } from '../../accessors/feature';
import noop from '../../util/noop';

const Second = setEnv(CLI)(noop);

export default Second;
