import { debugIt } from '../util/debug';
import scheduleCurrentState from '../features/spotify/schedules/current-state';

const daemon = async oxi => {
  const { scheduler } = oxi;
  debugIt('starting');

  await scheduler.start();
  await oxi(scheduleCurrentState());

  debugIt('started');
};

export default daemon;
