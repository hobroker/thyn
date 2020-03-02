import oxium, { assign } from 'oxium';
import { andThen, curry, otherwise, pipe } from 'ramda';
import execApp from './util/execApp';
import { debugIt } from './util/debug';

const onDone = pipe(debugIt.lazy('running'));
const onFail = err => debugIt(err);

const run = curry((features, arg, apps) =>
  pipe(
    oxium(features),
    andThen(pipe(assign(arg), onDone, execApp(apps))),
    otherwise(onFail),
  )(arg),
);

export default run;
