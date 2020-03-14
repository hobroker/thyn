import { always } from 'ramda';
import { debugIt } from '../../../util/debug';
import { whenSchedulerExists } from '../../scheduler/helpers';

const scheduleCurrentState = always(
  whenSchedulerExists(async ({ scheduler }) => {
    scheduler.define('test', () => {
      debugIt('here');

      return 'ok';
    });

    return scheduler.every('10 seconds', 'test');
  }),
);

export default scheduleCurrentState;
