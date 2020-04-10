import { applyTo } from 'ramda';
import { get } from '../../express/methods';
import { SPOTIFY } from '../constants';
import syncState from '../resolvers/syncState';
import getLatestPlayableState from '../resolvers/getLatestPlayableState';

const state = applyTo(syncState());
const latestState = applyTo(getLatestPlayableState());

export default {
  [SPOTIFY]: {
    state: get(state),
    latest: get(latestState),
  },
};
