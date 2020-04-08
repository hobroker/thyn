import { applyTo } from 'ramda';
import { get } from '../../express/methods';
import { SPOTIFY } from '../constants';
import syncState from '../resolvers/syncState';
import getLatestState from '../resolvers/getLatestState';

const state = applyTo(syncState());
const latestState = applyTo(getLatestState());

export default {
  [SPOTIFY]: {
    state: get(state),
    latest: get(latestState),
  },
};
