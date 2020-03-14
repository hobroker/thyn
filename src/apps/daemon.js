import { debugIt } from '../util/debug';

const daemon = async ({ scheduler }) => {
  await scheduler.start();

  debugIt('started');
};

export default daemon;
