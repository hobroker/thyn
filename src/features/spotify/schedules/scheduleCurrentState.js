import { always, compose } from 'ramda';
import { whenSchedulerExists } from '../../scheduler/helpers';
import syncState from '../resolvers/syncState';

const scheduleCurrentState = always(
  whenSchedulerExists(async oxi => {
    const { scheduler } = oxi;

    scheduler.define('test', compose(oxi, syncState));

    return scheduler.every('5 seconds', 'test');
  }),
);

export default scheduleCurrentState;
