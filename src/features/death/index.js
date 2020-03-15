import death from 'death';
import { call } from 'ramda';
import { debugIt } from '../../util/debug';
import wait from '../../util/wait';
import { DEATH_TIMEOUT } from './constants';

const prepareForDeath = fns => {
  const clear = death(() => {
    const featureDeaths = Promise.all(fns.map(call));
    const lastResort = wait(DEATH_TIMEOUT).then(debugIt.lazy('timeout'));

    return Promise.race([featureDeaths, lastResort]).then(() => {
      clear();
      debugIt('finished');
      process.exit(0);
    });
  });
};

const Death = async () => {
  const fns = [];
  const addToFns = fn => fns.push(fn);

  prepareForDeath(fns);

  return {
    death: addToFns,
  };
};

export default Death;
