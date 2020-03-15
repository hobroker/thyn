import { debugIt } from '../util/debug';

const daemon = async ({ scheduler }) => {
  debugIt('starting');

  await scheduler.start();

  debugIt('started');
};

export default daemon;
