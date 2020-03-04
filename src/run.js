import oxium from 'oxium';
import { andThen, curry, otherwise, pipe } from 'ramda';
import applyApps from './util/applyApps';
import { debugIt } from './util/debug';

const onDone = () => debugIt.lazy('running');
const onFail = error => debugIt(error);

const run = curry((features, arg, apps) =>
  pipe(
    oxium(features),
    andThen(pipe(onDone, applyApps(apps))),
    otherwise(onFail),
  )(arg),
);

export default run;
