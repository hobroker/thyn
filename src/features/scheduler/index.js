import Agenda from 'agenda';
import { compose } from 'ramda';
import { whenDying } from '../death/helpers';
import { debugIt } from '../../util/debug';
import { ensureDependencies, isNotWebApp } from '../cli/accessors';
import { getMongoConfig } from '../mongo/accessors';

const Scheduler = async oxi => {
  const { connectionString } = oxi(getMongoConfig);
  debugIt('creating agenda');
  const scheduler = new Agenda({
    db: {
      address: connectionString,
      options: {
        useUnifiedTopology: true,
      },
    },
  });
  debugIt('agenda started');

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

export default compose(ensureDependencies([isNotWebApp]))(Scheduler);
