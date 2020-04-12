import { always, path } from 'ramda';
import { EXPRESS } from '../constants';

const getBaseURL = always(path([EXPRESS, 'baseURL']));

export default getBaseURL;
