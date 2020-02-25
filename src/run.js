import oxium from 'oxium';
import { andThen, curry, otherwise, pipe, tap } from 'ramda';
import execApp from './util/execApp';
import { createDebug } from './util/debug';

const debugIt = createDebug('run');

const onDone = pipe(tap(() => debugIt('running')));
const onFail = pipe(debugIt);

const run = curry((features, arg, apps) =>
  pipe(
    oxium(features),
    andThen(pipe(onDone, execApp(apps))),
    otherwise(onFail),
  )(arg),
);

export default run;
