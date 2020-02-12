import { createDebug } from '../../../util/debug';

const debugIt = createDebug('second-cli');

const secondCliHandler = () => {
  debugIt('hello');
};

export default secondCliHandler;
