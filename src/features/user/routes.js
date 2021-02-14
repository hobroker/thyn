import { keys } from 'ramda';
import { USER } from './constants';
import { get } from '../express/methods';

const hello = keys;

export default {
  [USER]: {
    '/': [get(hello)],
  },
};
