import { lens, path } from 'ramda';
import { assocPathM } from 'oxium';

const lensPathM = key => lens(path(key), assocPathM([key]));

export default lensPathM;
