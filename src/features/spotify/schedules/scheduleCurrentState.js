import { always, compose } from 'ramda';
import syncState from '../resolvers/syncState';

const JOB_NAME = 'spotify state';

const scheduleCurrentState = always(async oxi => {
  const { scheduler } = oxi;

  scheduler.define(JOB_NAME, compose(oxi, syncState));

  return scheduler.every('10 seconds', JOB_NAME);
});

export default scheduleCurrentState;
