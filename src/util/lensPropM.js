import { lens, path } from 'ramda';
import { assocM } from 'oxium';

const lensPropM = key => lens(path(key), assocM([key]));

export default lensPropM;
