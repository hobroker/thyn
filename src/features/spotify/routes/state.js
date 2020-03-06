import { applyTo } from 'ramda';
import { get } from '../../express/methods';
import { SPOTIFY } from '../constants';
import syncState from '../resolvers/syncState';

const state = applyTo(syncState());

export default {
  [SPOTIFY]: {
    state: get(state),
  },
};
