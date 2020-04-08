import { always, compose } from 'ramda';
import { whenSchedulerExists } from '../../scheduler/helpers';
import syncState from '../resolvers/syncState';

const JOB_NAME = 'spotify state';

const scheduleCurrentState = always(
  whenSchedulerExists(async oxi => {
    const { scheduler } = oxi;

    scheduler.define(JOB_NAME, compose(oxi, syncState));

    return scheduler.every('1 minute', JOB_NAME);
  }),
);

export default scheduleCurrentState;
