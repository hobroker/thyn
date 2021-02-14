import { lens, prop } from 'ramda';
import { assocM } from './mutable';

const lensPropM = key => lens(prop(key), assocM(key));

export default lensPropM;
