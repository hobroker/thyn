import { always, compose } from 'ramda';
import syncAllUsers from '../resolvers/syncAllUsers';

const JOB_NAME = 'spotify state';

const scheduleCurrentState = always(async oxi => {
  const { scheduler } = oxi;

  scheduler.define(JOB_NAME, compose(oxi, syncAllUsers));

  return scheduler.every('1 minute', JOB_NAME);
});

export default scheduleCurrentState;
