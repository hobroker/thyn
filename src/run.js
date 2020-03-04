import oxium from 'oxium';
import { andThen, otherwise, pipe, tap } from 'ramda';
import { debugIt } from './util/debug';

const onDone = tap(debugIt.lazy('loaded'));
const onFail = error => debugIt(error);

const run = pipe(oxium, andThen(onDone), otherwise(onFail));

export default run;
