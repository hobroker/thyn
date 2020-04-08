import { always } from 'ramda';
import { whenSchedulerExists } from '../../scheduler/helpers';
import syncState from '../resolvers/syncState';

const scheduleCurrentState = always(
  whenSchedulerExists(async oxi => {
    const { scheduler } = oxi;

    scheduler.define('test', () => oxi(syncState()));

    return scheduler.every('1 minute', 'test');
  }),
);

export default scheduleCurrentState;
