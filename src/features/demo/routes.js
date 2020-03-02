import { keys } from 'ramda';
import { DEMO } from './constants';
import { get } from '../express/methods';

const hello = keys;

export default {
  [DEMO]: {
    '/': [get(hello)],
  },
};
