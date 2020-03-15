import Agenda from 'agenda';
import { pipe } from 'ramda';
import readSecretSafe from '../vault/resolvers/readSecretSafe';
import { MONGO } from '../mongo/constants';
import { whenDying } from '../death/helpers';
import { debugIt } from '../../util/debug';
import { ensureDependencies, isNotWebApp } from '../cli/accessors';

const Scheduler = async oxi => {
  const { connectionString } = await oxi(readSecretSafe(MONGO));
  debugIt('creating agenda');
  const scheduler = new Agenda({
    db: {
      address: connectionString,
      options: {
        useUnifiedTopology: true,
      },
    },
  });

  oxi(
    whenDying(() => {
      debugIt('stopping');

      return scheduler.stop();
    }),
  );

  return {
    scheduler,
  };
};

// export default Scheduler;
export default pipe(ensureDependencies([isNotWebApp]))(Scheduler);
