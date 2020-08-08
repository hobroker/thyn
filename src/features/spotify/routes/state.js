import { get } from '../../express/methods';
import { SPOTIFY } from '../constants';
import { getLatestPlayableState, syncState } from '../resolvers/state';

export const state = oxi => oxi(syncState());
export const latestState = oxi => oxi(getLatestPlayableState());

export default {
  [SPOTIFY]: {
    state: get(state),
    latest: get(latestState),
  },
};
