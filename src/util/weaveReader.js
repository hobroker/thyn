import { weave } from 'ramda-adjunct';
import callReader from './callReader';

const weaveReader = weave(callReader);

export default weaveReader;
